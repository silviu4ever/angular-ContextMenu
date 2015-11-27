(function () {
    'use strict';
    angular.module('eDiscoveryApp').directive('drContextMenu', function ($parse) {
        var buildMenuItem = function ($, $scope, list, item) {
            var $li = $('<li>');
            var $a = $('<a>');
            var $img = $('<img>');
            var $check = $('<input />');
            if (item === null) {
                $li.addClass('divider');
            }
            else if (item.subItems instanceof Array) {
                $li.addClass("dropdown-submenu");
                var $subMenu = $('<ul class="dropdown-menu">');

                item.subItems.forEach(function (subItem, x) {
                    buildMenuItem($, $scope, $subMenu, subItem);
                });
                $a = $('<a>');
                $a.text(item.name);
                if (item.hasCheckbox) {
                    $check = $('<input />', { type: 'checkbox', id: item.name, value: item.name, checked: isCheckBoxChecked });
                    $li.append($check);
                }
                if (item.src) {
                    $img = $('<img />', {
                        id: 'Myid',
                        width: 17,
                        src: item.src,
                        alt: 'MyAlt',
                        disabled: item.disabled
                    });
                    $li.append($img);
                }
                $li.append($a);
                $li.append($subMenu);
            } else {
                $a = $('<a>');
                $a.attr({ tabindex: '-1', href: '#', display: 'inline' });
                $a.text(item.name);
                if (item.hasCheckbox) {
                    $check = $('<input />', { type: 'checkbox', id: item.name, value: item.name, checked: item.isCheckBoxChecked });
                    $li.append($check);
                }
                if (item.src) {
                    $img = $('<img />', {
                        id: 'Myid',
                        width: 17,
                        src: item.src,
                        alt: 'MyAlt',
                        disabled: item.disabled
                    });
                    $li.append($img);
                }
                $li.append($a);
                if (item.disabled) {
                    $li.css({ opacity: 0.5 });
                }
                else {
                    $li.css({ opacity: 1 });
                    $li.on('click', function () {
                        $scope.$apply(function () {
                            item.onClick.call($scope, $scope);
                        });
                    });
                }
            }
            list.append($li);
        };

        var renderContextMenu = function ($scope, event, options) {
            if (!$) { var $ = angular.element; }
            $(event.currentTarget).addClass('context');
            var $contextMenu = $('<div>');
            $contextMenu.addClass('dropdown clearfix');
            var $ul = $('<ul>');
            $ul.addClass('dropdown-menu');
            $ul.attr({ 'role': 'menu' });

            $ul.css({
                display: 'block',
                position: 'absolute',
                left: event.pageX + 'px',
                top: (window.innerHeight - event.pageY > 175) ? event.pageY + 'px' : (event.pageY - 175) + 'px'
            });
            angular.forEach(options, function (item, i) {
                buildMenuItem($, $scope, $ul, item);
            });
            $contextMenu.append($ul);
            $contextMenu.css({
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 9999
            });
            $(document).find('body').append($contextMenu);
            $contextMenu.on("click", function (e) {
                if (e.target.attributes[0].value != "opacity: 0.5;" && e.target.parentNode.attributes[0].value != "opacity: 0.5;") {
                    $(event.currentTarget).removeClass('context');
                    $contextMenu.remove();
                }
            }).on('contextmenu', function (event) {
                $(event.currentTarget).removeClass('context');
                event.preventDefault();
                $contextMenu.remove();
            });
        };
        return function ($scope, element, attrs) {
            element.on('contextmenu', function (event) {
                $scope.$apply(function () {
                    event.preventDefault();
                    var options = $scope.$eval(attrs.drContextMenu);
                    if (options instanceof Array) {
                        renderContextMenu($scope, event, options);
                    } else {
                        throw '"' + attrs.drContextMenu + '" not an array';
                    }
                });
            });
        };
    });





}());
