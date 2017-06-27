angular.module('cms', [ 'cms.config',
                        'cms.contextmenu.directive',
                        'cms.notification.directive',
                        'cms.kendopager.directive',
                        'cms.session.service',
                        'cms.regionlist.service',
                        'cms.company.service',
                        'cms.header.controller',
                        'cms.login.controller',
                        'cms.logout.controller',
                        'cms.company.controller',
                        'cms.employee.controller'
                      ]
);
