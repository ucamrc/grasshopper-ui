/*!
 * Copyright 2014 Digital Services, University of Cambridge Licensed
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

define(['exports'], function(exports) {

    /**
     * Add an event to an organisational unit
     *
     * @param  {Number}      orgUnitId    The ID of the organisational unit to add an event to
     * @param  {Number}      eventId      The ID of the event to add to the organisational unit
     * @param  {Function}    callback     Standard callback function
     */
    var addEvent = exports.addEvent = function(orgUnitId, eventId, callback) {

    };

    /**
     * Add an event series to an organisational unit
     *
     * @param {Number}      orgUnitId    The ID of the organisational unit to add an event series to
     * @param {Number}      serieId      The ID of the event series to add to the organisational unit
     * @param {Function}    callback     Standard callback function
     */
    var addEventSeries = exports.addEventSeries = function(orgUnitId, serieId, callback) {

    };

    /**
     * Create a new organisational unit in an app
     *
     * @param  {Number}      appId          The ID of the app to create the organisational unit for
     * @param  {String}      displayName    The name of the organisational unit
     * @param  {String}      type           The type of the organisational unit. e.g., `tripos`, `part`
     * @param  {Number}      [parentId]     The ID of the parent organisational unit
     * @param  {Number}      [groupId]      The ID of the group that can manage the organisational unit
     * @param  {String}      [description]  The description of the organisational unit
     * @param  {Function}    [callback]     Standard callback function
     */
    var createOrgUnit = exports.createOrgUnit = function(appId, displayName, type, parentId, groupId, description, callback) {

    };

    /**
     * Delete an organisational unit
     *
     * @param  {Number}      orgUnitId     The ID of the organisational unit to delete
     * @param  {Function}    [callback]    Standard callback function
     */
    var deleteOrgUnit = exports.deleteOrgUnit = function(orgUnitId, callback) {

    };

    /**
     * Get the event series in an organisational unit
     *
     * @param  {Number}      orgUnitId     The ID of the organisational unit to retrieve the event series for
     * @param  {Number}      [limit]       The maximum number of results to retrieve
     * @param  {Number}      [offset]      The paging number of the results to retrieve
     * @param  {Boolean}     [upcoming]    Whether to only include event series with upcoming events.
     * @param  {Function}    callback      Standard callback function
     */
    var getEventSeries = exports.getEventSeries = function(orgUnitId, limit, offset, upcoming, callback) {

    };

    /**
     * Get the calendar for an organisational unit
     *
     * @param  {Number}       orgUnitId     The ID of the organisational unit to get the calendar for
     * @param  {String}       from          The timestamp (ISO 8601) from which to get the calendar for the organisational unit
     * @param  {String}       to            The timestamp (ISO 8601) until which to get the calendar for the organisational unit
     * @param  {Function}     [callback]    Standard callback function
     */
    var getOrgUnitCalendar = exports.getOrgUnitCalendar = function(orgUnitId, from, to, callback) {

    };

    /**
     * Get the calendar for an organisational unit in iCal
     *
     * @param  {Number}      orgUnitId    The ID of the organisational unit to get the calendar for in iCal format
     * @param  {Function}    callback     Standard callback function
     */
    var getOrgUnitCalendarICal = exports.getOrgUnitCalendarICal = function(orgUnitId, callback) {

    };

    /**
     * Get the calendar for an organisational unit in RSS
     *
     * @param  {Number}      orgUnitId    The ID of the organisational unit to get the calendar for in RSS format
     * @param  {Function}    callback     Standard callback function
     */
    var getOrgUnitCalendarRSS = exports.getOrgUnitCalendarRSS = function(orgUnitId, callback) {

    };

    /**
     * Get the organisational units in an app
     *
     * @param  {Number}      appId              The ID of the app to get the organisational units for
     * @param  {Number}      [parentId]         The ID of the parent to retrieve the organisational units for
     * @param  {Boolean}     [includeSeries]    Whether to include the event series associated to the oranisational units
     * @param  {String}      [type]             The organisational unit type(s) to filter the organisational unit by
     * @param  {Function}    [callback]         Standard callback function
     */
    var getOrgUnits = exports.getOrgUnits = function(appId, includeSeries, parentId, type, callback) {

    };

    /**
     * Get the upcoming events in an organisational unit
     *
     * @param  {Number}      orgUnitId    The ID of the organisational unit to get the upcoming events for
     * @param  {Number}      [limit]      The maximum number of results to retrieve
     * @param  {Number}      [offset]     The paging number of the results to retrieve
     * @param  {Function}    callback     Standard callback function
     */
    var getUpcomingEvents = exports.getUpcomingEvents = function(orgUnitId, limit, offset, callback) {

    };

    /**
     * Remove an event from an organisational unit
     *
     * @param  {Number}      orgUnitId     The ID of the organisational unit to remove an event from
     * @param  {Number}      eventId       The ID of the event to remove from the organisational unit
     * @param  {Function}    [callback]    Standard callback function
     */
    var removeEvent = exports.removeEvent = function(orgUnitId, eventId, callback) {

    };

    /**
     * Remove an event series from an organisational unit
     *
     * @param  {Number}      orgUnitId     The ID of the organisational unit to remove an event series from
     * @param  {Number}      serieId       The ID of the event series to remove from the organisational unit
     * @param  {Function}    [callback]    Standard callback function
     */
    var removeEventSeries = exports.removeEventSeries = function(orgUnitId, serieId, callback) {

    };

    /**
     * Subscirbe to the event series and events in an organisational unit
     *
     * @param  {Number}      orgUnitId     The ID of the organisational unit to subscribe to the event series and events for
     * @param  {Function}    [callback]    Standard callback function
     */
    var subscribe = exports.subscribe = function(orgUnitId, callback) {

    };

    /**
     * Update an organisational unit
     *
     * @param  {Number}      orgUnitId        The ID of the organisational unit to update
     * @param  {String}      [description]    The updated description of the organisational unit
     * @param  {String}      [displayName]    The updated display name of the organisational unit
     * @param  {Number}      [groupId]        The updated ID of the group that can manage the organisational unit
     * @param  {Number}      [parentId]       The updated ID of the parent organisational unit
     * @param  {String}      [type]           The updated type of the organisational unit. e.g., `tripos`, `part`
     * @param  {Function}    [callback]       Standard callback function
     */
    var updateOrgUnit = exports.updateOrgUnit = function(orgUnitId, description, displayName, groupId, parentId, type, callback) {

    };
});