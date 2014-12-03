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

define(['gh.core', 'bootstrap.calendar', 'bootstrap.listview', 'chosen'], function(gh) {

    // Dummy module JSON data to render the partial with
    var dummyModules = [
        {
            "description": "S1: Advanced Social Anthropology I: Thought, Belief and Ethics",
            "displayName": "S1: Advanced Social Anthropology I: Thought, Belief and Ethics",
            "eventSummary": "S1: Advanced Social Anthropology I: Thought, Belief and Ethics",
            "id": 0,
            "subscribed": false,
            'events': [
                {
                    "id": 1,
                    "description": "Citizenship",
                    "displayName": "Citizenship",
                    "location": "Seminar Room, Social Anthropology",
                    "notes": "Mi1-4 W 10",
                    "start": '2014-11-27T12:30:00',
                    "end": '2014-11-27T15:45:00',
                    "subscribed": false,
                    "organisers": [
                        {
                            "organiser": {
                                "user": {
                                    "displayName": "Dr S Lazar",
                                    "isAdmin": false
                                }
                            }
                        }
                    ]
                },
                {
                    "id": 2,
                    "description": "Citizenship",
                    "displayName": "Citizenship",
                    "location": "Seminar Room, Social Anthropology",
                    "notes": "Mi1-4 W 10",
                    "start": '2014-11-27T09:30:00',
                    "end": '2014-11-27T12:00:00',
                    "subscribed": false,
                    "organisers": [
                        {
                            "organiser": {
                                "user": {
                                    "displayName": "Dr S Lazar",
                                    "isAdmin": false
                                }
                            }
                        }
                    ]
                },
                {
                    "id": 3,
                    "description": "Citizenship",
                    "displayName": "Citizenship",
                    "location": "Seminar Room, Social Anthropology",
                    "notes": "Mi1-4 W 10",
                    "start": '2014-11-27T08:30:00',
                    "end": '2014-11-27T10:45:00',
                    "subscribed": false,
                    "organisers": [
                        {
                            "organiser": {
                                "user": {
                                    "displayName": "Dr S Lazar",
                                    "isAdmin": false
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "description": "S2: Advanced Social Anthropology I: Thought, Belief and Ethics",
            "displayName": "S2: Advanced Social Anthropology I: Thought, Belief and Ethics",
            "eventSummary": "S2: Advanced Social Anthropology I: Thought, Belief and Ethics",
            "id": 4,
            "subscribed": false,
            'events': [
                {
                    "id": 5,
                    "description": "Citizenship 2",
                    "displayName": "Citizenship 2",
                    "location": "Seminar Room, Social Anthropology",
                    "notes": "Mi1-4 W 10",
                    "start": '2014-11-23T11:30:00',
                    "end": '2014-11-23T12:45:00',
                    "subscribed": false,
                    "organisers": [
                        {
                            "organiser": {
                                "user": {
                                    "displayName": "Dr S Lazar",
                                    "isAdmin": false
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ];

    /**
     * Render the header
     */
    var renderHeader = function() {
        gh.api.utilAPI.renderTemplate($('#gh-header-template'), {
            'gh': gh
        }, $('#gh-header'));
    };

    /**
     * Render the subheader
     */
    var renderSubHeader = function() {
        $('#gh-subheader-tripos').chosen({
            'no_results_text': 'No matches for'
        });

        $('#gh-subheader-part').chosen({
            'no_results_text': 'No matches for',
            'disable_search_threshold': 10
        });
    };

    /**
     * Render the modules in the sidebar
     */
    var renderModules = function() {
        gh.api.utilAPI.renderTemplate($('#gh-modules-template'), {
            'data': dummyModules
        }, $('#gh-modules-container'));

        $(document).trigger('gh.listview.init', {
            'modules': dummyModules
        });
    };

    /**
     * Render the calendar view
     */
    var renderCalendarView = function() {
        gh.api.utilAPI.renderTemplate($('#gh-calendar-template'), {
            'data': dummyModules
        }, $('#gh-main'));

        $(document).trigger('gh.calendar.init');
    };

    /**
     * Log in using the local authentication strategy
     *
     * @return {Boolean}     Return false to avoid default form behaviour
     */
    var doLogin = function() {
        var formValues = _.object(_.map($(this).serializeArray(), _.values));
        gh.api.authenticationAPI.login(formValues.username, formValues.password, function(err) {
            if (!err) {
                window.location = '/';
            } else {
                // Show an error to the user
            }
        });

        return false;
    };

    /**
     * Add bindings to various elements on the page
     */
    var addBinding = function() {
        $('body').on('submit', '#gh-signin-form', doLogin);

        $(document).on('gh.calendar.ready', function() {
            renderCalendarView();
        });

        $(document).on('gh.listview.ready', function() {
            renderModules();
        });
    };

    /**
     * Initialise the page
     */
    var initIndex = function() {
        addBinding();
        renderHeader();
        renderSubHeader();
        renderModules();
        renderCalendarView();
    };

    initIndex();
});
