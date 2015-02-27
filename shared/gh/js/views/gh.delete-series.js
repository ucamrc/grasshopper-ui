/*!
 * Copyright 2015 Digital Services, University of Cambridge Licensed
 * under the Educational Community License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

define(['gh.core', 'gh.api.series', 'gh.api.orgunit'], function(gh, seriesAPI, orgUnitAPI) {

    // Cache whether the series is borrowed from another module
    var isBorrowedFrom = false;

    /**
     * Remove a series from the module
     *
     * @private
     */
    var removeSeriesFromModule = function() {
        // Get the ID of the series to remove
        var seriesId = parseInt($.bbq.getState().series, 10);
        // Get the ID of the module to remove the series from
        var moduleId = parseInt($.bbq.getState().module, 10);

        // Remove the series from the module
        gh.api.orgunitAPI.deleteOrgUnitSeries(moduleId, seriesId, function(err) {
            if (err) {
                // Show a failure notification
                gh.utils.notification('Removing series failed.', 'An error occurred while removing the series.', 'error');
            }

            // Hide the modal
            $('#gh-delete-series-modal').modal('hide');

            // Refresh the modules list
            $(document).trigger('gh.listview.refresh', {
                'partId': parseInt($.bbq.getState().part, 10)
            });

            // Show a success notification
            gh.utils.notification('Series removed.', 'The series was successfully removed.');
        });
    };

    /**
     * Delete the series from the module and system
     *
     * @private
     */
    var deleteSeries = function() {
        // Get the ID of the series to delete
        var seriesId = parseInt($.bbq.getState().series, 10);

        // Delete the series
        gh.api.seriesAPI.deleteSeries(seriesId, function(err) {
            if (err) {
                // Show a failure notification
                gh.utils.notification('Deleting series failed.', 'An error occurred while deleting the series.', 'error');
            }

            // Hide the modal
            $('#gh-delete-series-modal').modal('hide');

            // Refresh the modules list
            $(document).trigger('gh.listview.refresh', {
                'partId': parseInt($.bbq.getState().part, 10)
            });

            // Show a success notification
            gh.utils.notification('Series deleted.', 'The series was successfully deleted.');
        });
    };

    /**
     * Retrieve data for organisational units linked to a series through having borrowed the series
     *
     * @param  {Object}      series      The series to get the associated modules' data for
     * @param  {Function}    callback    Standard callback function
     * @param  {Object}      series      The modified series object with a `part` and `tripos` data object on each organisational unit
     * @private
     */
    var getModuleData = function(series, callback) {
        var todo = series.OrgUnits.length;
        var done = 1;

        /**
         * Retrieve data for an organisational unit and its parent tripos
         *
         * @param  {Object}      orgUnit      The organisational unit to get data for
         * @param  {Function}    _callback    Standard callback function
         * @private
         */
        var getModule = function(orgUnit, _callback) {
            // Get the organisational unit (part)
            orgUnitAPI.getOrgUnit(orgUnit.ParentId, false, function(err, _orgUnit) {
                if (err) {
                    // Show a failure notification
                    return gh.utils.notification('Retrieving module failed.', 'An error occurred while retrieving the module information.', 'error');
                }

                // Cache the part object on the series
                series.OrgUnits[done].part = _orgUnit;

                // Get the parent of the organisational unit (tripos)
                orgUnitAPI.getOrgUnit(_orgUnit.ParentId, false, function(err, _orgUnit) {
                    if (err) {
                        // Show a failure notification
                        return gh.utils.notification('Retrieving module failed.', 'An error occurred while retrieving the module information.', 'error');
                    }

                    // Cache the tripos object on the series
                    series.OrgUnits[done].tripos = _orgUnit;

                    done++;
                    // When we're done, execute the callback
                    if (todo === done) {
                        _callback();
                    // Call itself when more organisational units need to be fetched
                    } else {
                        getModule(series.OrgUnits[done], _callback);
                    }
                });
            });
        };

        // The first orgunit in the series is the original module where other modules borrow from,
        // so we start fetching data from the second orgunit on.
        if (todo >= 2) {
            getModule(series.OrgUnits[1], function() {
                callback(series);
            });
        } else {
            callback(series);
        }
    };

    /**
     * Determine how to remove the series from the module
     *
     * @private
     */
    var submitDeleteSeries = function() {
        // If the series is borrowed from another module, only remove it from this series
        if (isBorrowedFrom) {
            removeSeriesFromModule();
        // If the series is not borrowed by or from another module, it can be deleted
        } else {
            deleteSeries();
        }
    };

    /**
     * Return whether or not the series is borrowed to another module
     *
     * @param  {Object}     series    The series to determine it was borrowed to another module or not
     * @return {Boolean}              Return `true` if the series was borrowed to another module, `false` if not
     * @private
     */
    var getIsBorrowedTo = function(series) {
        var isBorrowedTo = false;

        if (series.OrgUnits.length > 1) {
            isBorrowedTo = true;
        }

        return isBorrowedTo;
    };

    /**
     * Return whether or not the series is borrowed from another module
     *
     * @param  {Object}     series     The series to determine was borrowed or not
     * @return {Boolean}               Return `true` if the series was borrowed from another module, `false` if not
     * @private
     */
    var getIsBorrowedFrom = function(series, module) {
        var isBorrowed = false;

        // The backend returns the original module as the first item in the OrgUnits Array.
        // If that module is not the same as the module we're in, the series is borrowed from another module.
        if (series.OrgUnits && series.OrgUnits.length) {
            if (series.OrgUnits[0].id !== module.id) {
                isBorrowed = true;
            }
        }

        return isBorrowed;
    };

    /**
     * Render and show the 'delete series' modal dialog
     *
     * @private
     */
    var setUpDeleteSeriesModal = function() {
        var seriesId = parseInt($.bbq.getState().series, 10);
        var moduleId = parseInt($.bbq.getState().module, 10);

        gh.api.seriesAPI.getSeries(seriesId, true, function(seriesErr, series) {
            if (seriesErr) {
                gh.utils.notification('Fetching series failed.', 'An error occurred while fetching the series information.', 'error');
            }

            gh.api.orgunitAPI.getOrgUnit(moduleId, false, function(moduleErr, module) {
                if (moduleErr) {
                    gh.utils.notification('Fetching module failed.', 'An error occurred while fetching the module information.', 'error');
                }

                isBorrowedFrom = getIsBorrowedFrom(series, module);
                var isBorrowedTo = getIsBorrowedTo(series, module);

                getModuleData(series, function(series) {
                    // Render the modal
                    gh.utils.renderTemplate($('#gh-delete-series-modal-template'), {
                        'data': {
                            'series': series,
                            'module': module,
                            'isBorrowedFrom': isBorrowedFrom,
                            'isBorrowedTo': isBorrowedTo
                        }
                    }, $('#gh-delete-series-modal-container'));

                    // Show the modal
                    $('#gh-delete-series-modal').modal();
                });
            });
        });
    };


    /////////////
    // BINDING //
    /////////////

    /**
     * Add handlers to various elements in the delete series modal
     *
     * @private
     */
    var addBinding = function() {
        $('body').on('click', '.gh-delete-series', setUpDeleteSeriesModal);
        $('body').on('click', '#gh-delete-series-delete', submitDeleteSeries);
    };

    addBinding();
});
