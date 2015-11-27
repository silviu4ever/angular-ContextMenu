# angular-ContextMenu
A Context Menu directive for angular based apps which can also contain subMenu items, Images, checkboxes, etc

Why a new Context Menu for angular?

I've searched a lot for a more 'complete' Context Menu directive and I didn't find any for free.
By 'complete' I mean I want a context menu directive that could do the following:
- Context Menu can contain subItems (children)
- I can add an icon before each option
- I can add a checkbox too in fron of an option
- I can set a specific option disabled
- Context menu should be rendered above the mouse if right clicking items from bottom of the page


How to Use:
1. Load the directive in your module
2.define the contextmenu in your template
<div style="height: 100%;" dr-context-menu="menuOptions"></div>

3. define the menuOptions in your controller. I will attach a screenshot so you could see how the context Menu will look.
         $scope.menuOptions = [
                {
                    name: "View", src: "assets/img/report.png", hasCheckbox: false, disabled: false,
                    onClick: function ($itemScope) {
                        //here is the function that will be called the this item will be clicked
                    },
                    subItems: [{
                        name: "Display all", hasCheckbox: true, isCheckBoxChecked: true, disabled: false, onClick: function ($itemScope) {
                        //here is the function that will be called the this item will be clicked
                        }
                    },
                    {
                        name: "Search Results Only", hasCheckbox: true, isCheckBoxChecked: false, disabled: false, onClick: function ($itemScope) {
                         //here is the function that will be called the this item will be clicked
                        }
                    }],
                },
                null,
                {
                    name: "Edit", src: "assets/img/pencil.png", hasCheckbox: false, disabled: false,
                    onClick: function ($itemScope) {
                        //here is the function that will be called the this item will be clicked
                    },
                    subItems: [
                        {
                            name: "Cancel tasks", src: "assets/img/time_delete.png", disabled: false, onClick: function ($itemScope) {
                                //here is the function that will be called the this item will be clicked
                            }
                        },
                        {
                            name: "Delete tasks", src: "assets/img/basket_delete.png", disabled: false, onClick: function ($itemScope) {
                                //here is the function that will be called the this item will be clicked
                            }
                        },
                    ],
                },
                null,
                {
                    name: "Download", src: "assets/img/arrow-down.png", hasCheckbox: false, disabled: false, onClick: function ($itemScope) {
                        //here is the function that will be called the this item will be clicked
                    }
                }
        ]
