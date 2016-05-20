var fileExtentionRange = '.png .jpg .jpeg';
var MAX_SIZE = 3; // MB

$(document).ready(function() {
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this);

        if (navigator.appVersion.indexOf("MSIE") != -1) { // IE
            var label = input.val();

            input.trigger('fileselect', [1, label, 0]);
        } else {
            var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            var numFiles = input.get(0).files ? input.get(0).files.length : 1;
            var size = input.get(0).files[0].size;

            input.trigger('fileselect', [numFiles, label, size]);
        }
    });
    $('.btn-file :file').on('fileselect', function(event, numFiles, label, size) {
        $('#attachmentName').attr('name', 'attachmentName');

        var postfix = label.substr(label.lastIndexOf('.'));
        if (fileExtentionRange.indexOf(postfix.toLowerCase()) > -1) {
            if (size > 1024 * 1024 * MAX_SIZE) {
                alert('Максимальный размер файла：<strong>' + MAX_SIZE + '</strong> MB.');

                $('#attachmentName').removeAttr('name');
            } else {
                $('#_attachmentName').val(label);
            }
        } else {
            alert('Допустимые расширения фотографий：<br/> <strong>' + fileExtentionRange + '</strong>');

            $('#attachmentName').removeAttr('name'); // cancel upload file.
        }
    });

});
var setThumbAndTouch = function() {
    //$('.nailthumb-container').nailthumb();
    $('.thumbs a').touchTouch();
    $('.ui.primary.button').on('click', function() {

    });

    $('.ui.dropdown')
        .dropdown();
    $('input:text, .ui.button', '.ui.fluid.action.input').on('click', function(e) {
        $('input:file', $(e.target).parents()).click();
    });
    $('#userPhoto').change(function(e) {
        if (e.target.files.length > 0) {
            var name = e.target.files[0].name;
            $('input:text', $(e.target).parent()).val(name);
        }
    });

    /*  $('input:text, .ui.button', '.ui.action.input')
          .on('click', function(e) {
              $('input:file', $(e.target).parents()).click();
          });
  
      $('input:file', '.ui.action.input')
          .on('change', function(e) {
              if (e.target.files.length > 0) {
                  var name = e.target.files[0].name;
                  $('input:text', $(e.target).parent()).val(name);
              }
          });*/
    $('.ramkacommon')
        .popup({
            inline: true,
            delay: {
                show: 800,
                hide: 500
            }
        });
    $('#saveProps').on('click', function() {
        BKV.SharePointUtils.set_web_property();
    });
    $('#delUsers').on('click', function() {
        deleteAllUsers();
    });

    $('#defDepart').bind('DOMSubtreeModified', function() {
        var currDep = $('#defDepart').text();
        if (currDep)
            filterGallery(currDep);
    });

    $("#defBorder").bind("DOMSubtreeModified", function() {
        var resBorder = $("#defBorder").text();
        var resImage = $("#defImage").text();
        setAllClasses(resBorder, resImage, true);
    });

    $("#defImage").bind("DOMSubtreeModified", function() {
        var resBorder = $("#defBorder").text();
        var resImage = $("#defImage").text();
        setAllClasses(resBorder, resImage, true);
    });
}

'use strict';
_spBodyOnLoadFunctionNames.push("LoadSharePointJs");
function LoadSharePointJs() {
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);
};

var setAllClasses = function(borderType, imageType, userHavePerm) {
    if (userHavePerm) {
        borderType = $("#defBorder").text();
        imageType = $("#defImage").text();
    }
    if (imageType == "Маленький") {
        SetSmallImage(borderType);
    } else if (imageType == "Средний") {
        SetMediumImage(borderType);
    } else if (imageType == "Большой") {
        SetBigImage(borderType);
    } else {
        SetMediumImage(borderType);
    }
    $('.nailthumb-container').nailthumb();
}

var SetSmallImage = function(borderType) {
    $('.add-item-common').attr('class', 'add-item-common add-item-small');
    $('.add-item-image-common').attr('class', 'add-item-image-common add-item-image-small');
    $('.ramkacommon').attr('class', 'ramkacommon ramkasmall ramkaportret');
    $('.nailthumb-container').attr('class', 'nailthumb-container square-thumb-small');
    $('.tagcommon').attr('class', 'tagcommon tagsmall');
    $('.close-image-common').attr('class', 'close-image-common close-image-small')
    if (borderType == "Без рамки") {
        $(".ramkacommon").removeClass('ramkaportret').addClass('ramkanone');
        $(".nailthumb-container").removeClass('square-thumb-small').addClass('square-thumb-small-ramkanone');
        $(".tagcommon").removeClass('tagsmall').addClass('tagsmall-ramkanone');
        $(".close-image-common").removeClass('close-image-small').addClass('close-image-small-ramkanone');
    }
}
var SetMediumImage = function(borderType) {
    $('.add-item-common').attr('class', 'add-item-common add-item-medium');
    $('.add-item-image-common').attr('class', 'add-item-image-common add-item-image-medium');
    $(".ramkacommon").attr('class', 'ramkacommon ramkamedium ramkaportret');
    $('.nailthumb-container').attr('class', 'nailthumb-container square-thumb-medium');
    $('.tagcommon').attr('class', 'tagcommon tagmedium');
    $('.close-image-common').attr('class', 'close-image-common close-image-medium')
    if (borderType == "Без рамки") {
        $(".ramkacommon").removeClass('ramkaportret').addClass('ramkanone');
        $(".nailthumb-container").removeClass('square-thumb-medium').addClass('square-thumb-medium-ramkanone');
        $(".tagcommon").removeClass('tagmedium').addClass('tagmedium-ramkanone');
        $(".close-image-common").removeClass('close-image-medium').addClass('close-image-medium-ramkanone');
    }
}
var SetBigImage = function(borderType) {
    $('.add-item-common').attr('class', 'add-item-common add-item-big');
    $('.add-item-image-common').attr('class', 'add-item-image-common add-item-image-big');
    $(".ramkacommon").attr('class', 'ramkacommon ramkabig ramkaportret');
    $('.nailthumb-container').attr('class', 'nailthumb-container square-thumb-big');
    $('.tagcommon').attr('class', 'tagcommon tagbig');
    $('.close-image-common').attr('class', 'close-image-common close-image-big')
    if (borderType == "Без рамки") {
        $(".ramkacommon").removeClass('ramkaportret').addClass('ramkanone');
        $(".nailthumb-container").removeClass('square-thumb-big').addClass('square-thumb-big-ramkanone');
        $(".tagcommon").removeClass('tagbig').addClass('tagbig-ramkanone');
        $(".close-image-common").removeClass('close-image-big').addClass('close-image-big-ramkanone');
    }
}

var filterGallery = function filterThumbs(category) {
    $('.ramkacommon').each(function() {
        var thumbCategory = $(this).data('categories');
        if (category === 'Все департаменты' || category === 'Выберите подразделение') {
            this.style.display = 'inline-block';
        } else {
            if (thumbCategory.indexOf(category) !== -1) {
                this.style.display = 'inline-block';
            }
            else {
                this.style.display = 'none';
            }
        }
    });
}

var editElement = function(elem) {
    resetAllValues();
    $("#modalHeader").html("Редактирование данных о сотруднике").attr("data-value", "editUser");
    var idElem = elem.parentElement.id;
    var result = $.grep(itemsCollection, function(e) { return e.ID == idElem; });
    if (result.length == 0) {
        alert('Не удалось найти элемент');
    } else if (result.length == 1) {
        var itemForEdit = result[0];
        $("#fioUser").val(itemForEdit.FIO);
        if (itemForEdit.Nomination)
            $("#defNom").removeClass("default");
        $("#defNom").text(itemForEdit.Nomination);
        if (itemForEdit.Achievement)
            $("#defAch").removeClass("default");
        $("#defAch").text(itemForEdit.Achievement);
        if (itemForEdit.Department)
            $("#depUser").removeClass("default");
        $("#depUser").text(itemForEdit.Department);
        if (itemForEdit.Position)
            $("#posUser").removeClass("default");
        $("#posUser").val(itemForEdit.Position);
    } else {
        //Если вдруг по странному стечению обстоятельств вернулось несколько записей
    }

    showModal(false, itemForEdit.ID);
}

var addItem = function() {
    resetAllValues();
    $("#modalHeader").html("Добавление сотрудника на доску почета").attr("data-value", "newUser");

    showModal(true, null);
}

function resetAllValues() {
    $('.content').find('input:text').val('');
    $("#defNom").addClass("default");
    $("#defNom").text("Выберите номинацию");
    $("#defAch").addClass("default");
    $("#defAch").text("Выберите достижение");
    $("#depUser").addClass("default");
    $("#depUser").text("Выберите подразделение");
}

var showModal = function(isNew, itemId) {
    $('.ui.modal')
        .modal({
            closable: false,
            onDeny: function() {

            },
            onApprove: function() {
                BKV.SharePointUtils.create_item(isNew, itemId);
            }
        })
        .modal('show');
}

var deleteElement = function(elem) {
    mscConfirm("Вы действительно хотите удалить сотрудника?", function() {
        var parElem = elem.parentElement;
        if (parElem.id)
            BKV.SharePointUtils.delete_item(parElem.id);
    });
}

var deleteAllUsers = function() {
    mscConfirm("Вы действительно хотите удалить всех сотрудников?", function() {
        BKV.SharePointUtils.delete_allusers();
    });
}

var BKV = window.BKV || {};
var itemsCollection = [];

function sharePointReady() {
    document.getElementById("DeltaPlaceHolderSearchArea").style.padding = "0px";
    document.getElementById('pageTitle').style.fontSize = "1.2em";
    BKV.SharePointUtils = function() {
        var context = SP.ClientContext.get_current();
        var user = context.get_web().get_currentUser();
        var web = context.get_web();
        var userHavePermissions = false;
        var newItem = null;
        var contents = null;
        var currentId = null;
        var file = null;
        var properties = null;
        var bType = null;
        var iType = null;

        var getWebProperty = function() {
            properties = web.get_allProperties();
            context.load(web);
            context.load(properties);
            context.executeQueryAsync(successGettingProperty, failedGettingProperty);
        }

        var successGettingProperty = function() {
            var borderType = properties.get_fieldValues()["wohBorderType"];
            var imageType = properties.get_fieldValues()["wohImageType"];

            if (borderType) {
                bType = borderType;
                $("#defBorder").removeClass("default");
                $("#defBorder").text(bType);
            }
            if (imageType) {
                iType = imageType;
                $("#defImage").removeClass("default");
                $("#defImage").text(iType);
            }
            var adminPan = document.getElementById("adminPanel");
            if (adminPan) {
                if (!userHavePermissions) {
                    adminPan.outerHTML = "";
                    delete adminPan;
                }
                else {
                    $("#adminPanel").removeClass("hiddenseg");
                    $("#adminPanel").css("display", "block");
                }
            }
        }

        var setWebProperty = function() {
            properties = web.get_allProperties();
            var borderDefault = $("#defBorder.default.text").text();
            var imageDefault = $("#defImage.default.text").text();
            if (borderDefault)
                properties.set_item("wohBorderType", null);
            else
                properties.set_item("wohBorderType", $("#defBorder").text());
            if (imageDefault)
                properties.set_item("wohImageType", null);
            else
                properties.set_item("wohImageType", $("#defImage").text());
       
            context.load(web);
            web.update();
            context.executeQueryAsync(successSetProperty, failedGettingProperty);
        }

        var successSetProperty = function() {

        }

        var failedGettingProperty = function(sender, args) {
            alert(args.get_message());
        }

        var getUserName = function() {
            context.load(user);
            context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
        };

        var onGetUserNameSuccess = function() {
            alert(user.get_title());
        };

        var onGetUserNameFail = function(sender, args) {
            alert(args.get_message());
        };

        var getWOHItemsREST = function() {
            itemsCollection.length = 0;
            var requestUri = "/_api/lists/getbytitle('Доска почета')/items?$select=FIO,Achievement,Nomination,Position,Department,ID,Attachments,AttachmentFiles,Title&$expand=AttachmentFiles";

            $.ajax({
                url: requestUri,
                type: "GET",
                headers: { "ACCEPT": "application/json;odata=verbose" },
                success: function(data) {

                    $.each(data.d.results, function(i, item) {
                        itemsCollection.push(item);
                    })
                    //Фильтр массива на основе сохран
                    showWOH();
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
            });
        }

        var getWOHItems = function() {
            itemsCollection.length = 0;
            var wohList = context.get_web().get_lists().getByTitle('Доска почета');
            context.load(wohList);
            var items = wohList.getItems('');
            var results = context.loadQuery(items);
            context.executeQueryAsync(function() {
                results.forEach(function(item) {
                    itemsCollection.push(item);
                    //alert(item.get_item("Title"));
                })
                showWOH();
            });

        };

        var showWOH = function() {
            var mainThumbsDiv = document.getElementById("mainThumbs");
            mainThumbsDiv.innerHTML = '';
            if (userHavePermissions) {
                var divRam = document.createElement("div");
                divRam.className = "add-item-common add-item-medium";
                var divAddItem = document.createElement("div");
                divAddItem.className = "nailthumb-container containermedium square-thumb-medium";
                divAddItem.innerHTML = "<img class='add-item-image-common add-item-image-medium' onclick='addItem()' src='../_layouts/15/WallOfHonor/Source/img/additemuser.png'>";
                divRam.appendChild(divAddItem);
                mainThumbsDiv.appendChild(divRam);
            }
            itemsCollection.forEach(function(item) {
                var title = item.Title;
                var FIO = item.FIO;
                var Achievement = item.Achievement;
                var Nomination = item.Nomination;
                var Department = item.Department;
                var Position = item.Position;
                var id = item.ID;
                var attachmentUrl = item.AttachmentFiles.results[0];
                if (!attachmentUrl)
                    return;

                var divRamka = document.createElement("div");
                divRamka.className = "ramkacommon ramkamedium ramkanone";
                divRamka.setAttribute("data-value", FIO);
                divRamka.setAttribute("data-categories", Department);
                //divRamka.style.backgroundImage = "url('/_layouts/15/WallOfHonor/Source/img/ramka.jpg')";

                var divThumbDiv = document.createElement("div");
                divThumbDiv.className = "nailthumb-container containermedium square-thumb-medium";
                var htmlText = "<a href=" + attachmentUrl.ServerRelativeUrl + ">" +
                    "<img src=" + attachmentUrl.ServerRelativeUrl + "></a>";
                if (userHavePermissions) {
                    htmlText += "<div class='tagcommon tagmedium' id='" + id + "'>" +
                        "<button class='close-image-common close-image-medium' type='button' title='Редактировать' onclick='editElement(this)'><img src='../_layouts/15/WallOfHonor/Source/img/edit.png'></button>" +
                        "<button class='close-image-common close-image-medium' type='button' title='Удалить' onclick='deleteElement(this)'><img src='../_layouts/15/WallOfHonor/Source/img/recycle_bin.png'></button>" +
                        "</div>";
                }
                var divPopup = document.createElement("div");
                divPopup.className = "ui flowing popup top center transition hidden";
                divPopup.innerHTML = "<div class='ui one column divided center aligned grid'>" +
                    "<div class='column'>" +
                    "<p class='position'><b>" + Position + "</b></p>" +
                    "<div class='usercard'>" +
                    "<p><b>Номинация: </b>" + Nomination + "</p>" +
                    "<p><b>Достижение: </b>" + Achievement + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                divThumbDiv.innerHTML = htmlText;
                divRamka.appendChild(divThumbDiv);
                mainThumbsDiv.appendChild(divRamka);
                mainThumbsDiv.appendChild(divPopup);
            })
            setRealClasses(bType, iType);
            setThumbAndTouch();
        }

        var setRealClasses = function(borderType, imageType) {
            setAllClasses(borderType, imageType, userHavePermissions);
        }

        var createUpdateWOHItem = function(isNew, itemId) {
            createListItem(isNew, itemId);
        };

        var createListItem = function(isNew, itemId) {
            var fioUser = $("#fioUser").val();
            var depUser = $("#depUser").text();
            var posUser = $("#posUser").val();
            var defNom = $("#defNom").text();
            var defAch = $("#defAch").text();

            var wohList = context.get_web().get_lists().getByTitle('Доска почета');
            context.load(wohList);
            if (isNew) {
                var itemInfo = new SP.ListItemCreationInformation();
                newItem = wohList.addItem(itemInfo);
            }
            else {
                newItem = wohList.getItemById(itemId);
            }
            newItem.set_item('Title', "Сотрудник");
            newItem.set_item('Nomination', defNom);
            newItem.set_item('FIO', fioUser);
            newItem.set_item('Achievement', defAch);
            newItem.set_item('Department', depUser);
            newItem.set_item('Position', posUser);
            newItem.update();
            context.load(newItem);
            context.executeQueryAsync(oncreateUpdateWOHItemSuccess, oncreateUpdateWOHItemFail);
        };

        var oncreateUpdateWOHItemSuccess = function() {
            currentId = newItem.get_id();
            if (currentId) {
                if ($('#attachmentName')[0]) {
                    if ($('#attachmentName')[0].files[0]) {
                        file = $('#attachmentName')[0].files[0];
                        var fileName = file.name;

                        var reader = new window.FileReader();
                        reader.onload = fonload;

                        reader.onerror = function(event) {
                            console.error(event.target.error.code);
                        };
                        reader.readAsArrayBuffer(file);
                    } else {
                        getWOHItemsREST();
                    }
                } else {
                    getWOHItemsREST();
                }
            } else {
                getWOHItemsREST();
            }
        };

        function _arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new window.Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return binary;
        }

        function fonload(event) {
            contents = event.target.result;
            $.getScript("/_layouts/15/SP.RequestExecutor.js", fonload2);
        }
        function fonload2() {
            var contents2 = _arrayBufferToBase64(contents);

            var createitem = new SP.RequestExecutor("/");
            createitem.executeAsync({
                url: "/_api/web/lists/GetByTitle('Доска почета')/items(" + currentId + ")/AttachmentFiles/add(FileName='" + file.name + "')",
                method: "POST",
                binaryStringRequestBody: true,
                body: contents2,
                success: fsucc,
                error: ferr,
                state: "Update"
            });

            function fsucc(data) {
                getWOHItemsREST();
            }

            function ferr(data) {
                alert(data.statusText + "\n\n" + data.responseText);
            }
        }

        var oncreateUpdateWOHItemFail = function(sender, args) {
            alert('Не удалось создать элемент. Ошибка:' + args.get_message());
        };

        var deleteAllListItems = function() {
            var oList = context.get_web().get_lists().getByTitle('Доска почета');
            query = new SP.CamlQuery();
            items = oList.getItems(query);
            context.load(items, "Include(Id)");
            context.executeQueryAsync(function() {
                var enumerator = items.getEnumerator(),
                    itmArray = [];
                while (enumerator.moveNext()) {
                    itmArray.push(enumerator.get_current());
                }
                for (var s in itmArray) {
                    itmArray[s].deleteObject();
                }
                context.executeQueryAsync(onDeleteAllItemsSucceeded, onDeleteWOHItemFailed);
            });
        }

        var onDeleteAllItemsSucceeded = function() {
            getWOHItemsREST();
        }

        var deleteListItem = function(itemId) {
            currentId = itemId;
            var oList = context.get_web().get_lists().getByTitle('Доска почета');
            var oListItem = oList.getItemById(itemId);
            oListItem.deleteObject();
            context.executeQueryAsync(onDeleteWOHItemSucceeded, onDeleteWOHItemFailed);
        }

        var onDeleteWOHItemSucceeded = function() {
            $.each(itemsCollection, function(i) {
                if (itemsCollection[i].id === currentId) {
                    itemsCollection.splice(i, 1);
                    return false;
                }
            });
            var delElem = document.getElementById(currentId).parentElement.parentElement;
            var nextElem = delElem.nextSibling;
            if (delElem) {
                delElem.outerHTML = '';
                delete delElem;
            }
            if (nextElem) {
                nextElem.outerHTML = '';
                delete nextElem;
            }
        }

        function onDeleteWOHItemFailed(sender, args) {
            alert(args.get_message() + '\n' + args.get_stackTrace());
        }

        var IsCurrentUserMemberOfGroup = function(groupName, OnComplete) {
            context.load(user);

            var allGroups = web.get_siteGroups();
            context.load(allGroups);

            var group = allGroups.getByName(groupName);
            context.load(group);

            var groupUsers = group.get_users();
            context.load(groupUsers);

            context.executeQueryAsync(OnSuccess, OnFailure);

            function OnSuccess(sender, args) {
                var userInGroup = false;
                var groupUserEnumerator = groupUsers.getEnumerator();
                while (groupUserEnumerator.moveNext()) {
                    var groupUser = groupUserEnumerator.get_current();
                    if (groupUser.get_id() == user.get_id()) {
                        userHavePermissions = true;
                        break;
                    }
                }
                OnComplete(userInGroup);
            }

            function OnFailure(sender, args) {
                OnComplete(false);
            }
        }

        var IsCurrentUserHasContribPerms = function() {
            IsCurrentUserMemberOfGroup("WOFHonorGroup", function(isCurrentUserInGroup) {
                getWebProperty();
                getWOHItemsREST();
            });
        }

        return {
            get_username: getUserName,
            create_item: createUpdateWOHItem,
            delete_item: deleteListItem,
            delete_allusers: deleteAllListItems,
            check_permissions: IsCurrentUserHasContribPerms,
            set_web_property: setWebProperty,
            get_items: getWOHItemsREST //getWOHItems
        }
    } ()
    //BKV.SharePointUtils.get_username();
    //BKV.SharePointUtils.create_items();
    BKV.SharePointUtils.check_permissions();
    //BKV.SharePointUtils.get_items();
}