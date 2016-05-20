<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="WOHWebPart.ascx.cs" Inherits="WallOfHonor.WOHWebPart.WOHWebPart" %>

<%--<link type="text/css" rel="stylesheet" href="../_layouts/15/WallOfHonor/Source/css/nailthumb.min.css" />--%>
<link type="text/css" rel="stylesheet" href="../_layouts/15/WallOfHonor/Source/semantic/dist/semantic.min.css" />
<link type="text/css" rel="stylesheet" href="../_layouts/15/WallOfHonor/Source/css/dialogStyle.css" />
<link type="text/css" rel="stylesheet" href="../_layouts/15/WallOfHonor/Source/css/main.css" />
<link type="text/css" rel="stylesheet" href="../_layouts/15/WallOfHonor/Source/touch/touchTouch.css" />

<script type="text/javascript" src="../_layouts/15/WallOfHonor/Source/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="../_layouts/15/WallOfHonor/Source/semantic/dist/semantic.min.js"></script>
<script type="text/javascript" src="../_layouts/15/WallOfHonor/Source/js/dialog.js"></script>
<script type="text/javascript" src="../_layouts/15/WallOfHonor/Source/js/main.js"></script>
<script type="text/javascript" src="../_layouts/15/WallOfHonor/Source/touch/touchTouch.jquery.js"></script>
<script type="text/javascript" src="../_layouts/15/WallOfHonor/Source/js/nailthumb.min.js"></script>

<div class="ui segment">
    <div class="ui selection dropdown field" id="divDeparts">
        <input type="hidden" name="nomination">
        <i class="dropdown icon"></i>
        <div id="defDepart" class="default text">Выберите подразделение</div>
        <div class="menu">
            <div class="item" data-value="dep1" data-text="Все департаменты">
                Все департаменты
               
            </div>
            <div class="item" data-value="dep2" data-text="Департамент маркетинга">
                Департамент маркетинга
               
            </div>
            <div class="item" data-value="dep3" data-text="Департамент продаж">
                Департамент продаж
               
            </div>
            <div class="item" data-value="dep4" data-text="Департамент IT">
                Департамент IT
               
            </div>
            <div class="item" data-value="dep5" data-text="Департамент финансов">
                Департамент финансов
               
            </div>
        </div>
    </div>
    <div id="adminPanel" class="custom-seg hiddenseg" style="display: none">
        <div class="ui selection dropdown field custom-fld" id="divBorder">
            <input type="hidden" name="borderType">
            <i class="dropdown icon"></i>
            <div id="defBorder" class="default text">Тип рамки</div>
            <div class="menu">
                <div class="item" data-value="nom1" data-text="Портретная">
                    <img src="../_layouts/15/WallOfHonor/Source/img/ramka.jpg">Портретная
               
                </div>
                <div class="item" data-value="nom2" data-text="Без рамки">
                    <img src="../_layouts/15/WallOfHonor/Source/img/noborder.png">Без рамки
               
                </div>
            </div>
        </div>
        <div class="ui selection dropdown field custom-fld" id="divImageSize">
            <input type="hidden" name="imageSize">
            <i class="dropdown icon"></i>
            <div id="defImage" class="default text">Размер фото</div>
            <div class="menu">
                <div class="item" data-value="nom1" data-text="Маленький">
                    Маленький
               
                </div>
                <div class="item" data-value="nom2" data-text="Средний">
                    Средний
               
                </div>
                <div class="item" data-value="nom3" data-text="Большой">
                    Большой
               
                </div>
            </div>
        </div>
        <div class="rightpos">
            <button type="button" class="ui primary button" id="saveProps">
                Сохранить
           
            </button>
            <button type="button" class="ui button" id="delUsers">
                Удалить всех
           
            </button>
        </div>
    </div>
</div>
<div class="thumbs" id="mainThumbs">
    <!--Здесь будет datasource-->
    <%--<div class="ramka">
        <div class="nailthumb-container container square-thumb">
            <a href="../_layouts/15/WallOfHonor/Source/img/photo_test/worker1_b.jpg" class="ketchup tooltip" title="Начальник цеха №12 сталелитейного завода">
                <img class="ketchup tooltip" src="../_layouts/15/WallOfHonor/Source/img/photo_test/worker1_b.jpg">
            </a>
            <div class="tag">
                <button class="close-image" title="Редактировать">
                    <img src="../_layouts/15/WallOfHonor/Source/img/edit.png"></button>
                <button class="close-image" title="Удалить">
                    <img src="../_layouts/15/WallOfHonor/Source/img/recycle_bin.png"></button>
            </div>
        </div>
    </div>--%>
    <!---->
</div>
<div class="ui modal form custom-form">
    <i class="close icon"></i>
    <div class="header" id="modalHeader">Добавление сотрудника на доску почета</div>
    <div class="content">
        <div class="field">
            <label>ФИО сотрудника</label>
            <div class="ui input">
                <input type="text" id="fioUser" placeholder="Введите ФИО сотрудника" required>
            </div>
        </div>
        <%--<div class="field">
            <label>Департамент</label>
            <div class="ui input">
                <input type="text" id="depUser" placeholder="Введите подразделение">
            </div>
        </div>--%>
        <div class="field">
            <label>Департамент</label>
            <div class="ui selection dropdown">
                <input type="hidden" name="department">
                <i class="dropdown icon"></i>
                <div id="depUser" class="default text">Выберите подразделение</div>
                <div class="menu">
                    <div class="item" data-value="dep1" data-text="Департамент маркетинга">
                        Департамент маркетинга
                    </div>
                    <div class="item" data-value="dep2" data-text="Департамент продаж">
                        Департамент продаж                   
                    </div>
                    <div class="item" data-value="dep3" data-text="Департамент IT">
                        Департамент IT
                    </div>
                    <div class="item" data-value="dep4" data-text="Департамент финансов">
                        Департамент финансов
                   
                    </div>
                </div>
            </div>
        </div>
        <div class="field">
            <label>Должность</label>
            <div class="ui input">
                <input type="text" id="posUser" placeholder="Введите должность" required>
            </div>
        </div>
        <div class="field">
            <label>Номинация</label>
            <div class="ui selection dropdown field">
                <input type="hidden" name="nomination">
                <i class="dropdown icon"></i>
                <div id="defNom" class="default text">Выберите номинацию</div>
                <div class="menu">
                    <div class="item" data-value="nom1" data-text="Лучший менеджер">
                        <i class="trophy icon"></i>Лучший менеджер
                   
                    </div>
                    <div class="item" data-value="nom2" data-text="Лучший маркетолог">
                        <i class="trophy icon"></i>Лучший маркетолог
                   
                    </div>
                    <div class="item" data-value="nom3" data-text="Лучший консультант">
                        <i class="trophy icon"></i>Лучший консультант
                   
                    </div>
                    <div class="item" data-value="nom4" data-text="Лучший маркетинговый проект">
                        <i class="trophy icon"></i>Лучший маркетинговый проект
                   
                    </div>
                    <div class="item" data-value="nom5" data-text="Лучший региональный проект года">
                        <i class="trophy icon"></i>Лучший региональный проект года
                   
                    </div>
                    <div class="item" data-value="nom6" data-text="Лучший продукт менеджер">
                        <i class="trophy icon"></i>Лучший продукт менеджер
                   
                    </div>
                    <div class="item" data-value="nom7" data-text="Самый креативный сотрудник">
                        <i class="trophy icon"></i>Самый креативный сотрудник
                   
                    </div>
                    <div class="item" data-value="nom8" data-text="Самый ответственный сотрудник">
                        <i class="trophy icon"></i>Самый ответственный сотрудник
                   
                    </div>
                </div>
            </div>
        </div>
        <div class="field">
            <label>Достижение</label>
            <div class="ui selection dropdown">
                <input type="hidden" name="achivement">
                <i class="dropdown icon"></i>
                <div id="defAch" class="default text">Выберите достижение</div>
                <div class="menu">
                    <div class="item" data-value="ach1" data-text="За большие достижения в бизнесе">
                        За большие достижения в бизнесе
                    </div>
                    <div class="item" data-value="ach2" data-text="За достижение высокого профессионализма">
                        За достижение высокого профессионализма
                   
                    </div>
                    <div class="item" data-value="ach3" data-text="За вклад в продвижение продаж">
                        За вклад в продвижение продаж
                    </div>
                    <div class="item" data-value="ach4" data-text="За многолетний добросовестный труд">
                        За многолетний добросовестный труд
                   
                    </div>
                    <div class="item" data-value="ach5" data-text="За высокие показатели в работе">
                        За высокие показатели в работе
                    </div>
                </div>
            </div>
        </div>
<%--        <div class="field">
            <label>Фотография</label>
            <div class="ui fluid action input">
                <input type="text">
                <input type="file" id="userPhoto">
                <div class="ui icon button">
                    <i class="cloud upload icon"></i>
                </div>
            </div>
        </div>--%>
        <!--Альтернатива-->
        <div class="field">
            <div class="ui action input">
                <input type="text" id="_attachmentName">
                <label for="attachmentName" class="ui icon button btn-file">
                    <i class="cloud upload icon"></i>
                    <input type="file" id="attachmentName" name="attachmentName" style="display: none">
                </label>
            </div>
        </div>
        <!---->
        <div class="actions">
            <div class="ui positive right labeled icon button custom-button">
                Сохранить
              
                <i class="checkmark icon"></i>
            </div>
            <div class="ui cancel button">
                Отмена
               
            </div>
        </div>
    </div>
</div>
