﻿var userJs, userVar;

function initConfig() {
    //初始化模块JS
    userJs = new Globals.user();

    //页面变量
    userVar = {
    };

    (function () {
        $("#btnNew").click(function () {
            location.href = "new-user.html";
        })
        $(document).ready(function () {
            $.ajax({
                type: "post",
                url: Globals.ServiceUrl + "GetUserCount",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var s = JSON.parse(data.d);
                    var page = Math.ceil(s / 10);
                    $("#PageNo").text(1);
                    $("#totalPageNo").text(page);
                }, error: function (xhr) {
                    alert(xhr);
                }
            })
            Page(0);
            $(".first").click(function () {
                if ($("#PageNo").text() != 1) {
                    $("#PageNo").text(1);
                    Page(0);
                }
            })
            $(".before").click(function () {
                if ($("#PageNo").text() > 1) {
                    var number = parseInt($("#PageNo").text() - 1);
                    $("#PageNo").text(number);
                    Page((number - 1) * 10);
                }
            })
            $(".last").click(function () {
                if ($("#PageNo").text() < $("#totalPageNo").text()) {
                    var number = parseInt($("#totalPageNo").text());
                    $("#PageNo").text(number);
                    Page((number - 1) * 10);
                }
            })
            $(".next").click(function () {
                if (($("#PageNo").text() < $("#totalPageNo").text())) {
                    var number = parseInt($("#PageNo").text());
                    $("#PageNo").text(number + 1);
                    Page(number * 10);
                }
            })
            $(".Go").click(function () {
                if (($("#totalPageNo").text() >= $("#pageNum").val() >= 1 && $("#pageNum").val() != $("#PageNo"))) {
                    var number = parseInt($("#pageNum").val());
                    $("#PageNo").text(number);
                    Page((number - 1) * 10);
                }
            })
           
        });


    })();
}

$(function () {
    initConfig();
});


function Page(page) {
    var jsonPar = {
        number:page
    }
    $.ajax({
        type: "post",
        url: Globals.ServiceUrl + "GetUserList",
        //async: false,
        data:JSON.stringify(jsonPar),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var userList = JSON.parse(data.d);
            var tbody = $("#divUserList table tbody").empty();

            for (i in userList) {
                var content = "<td>" + userList[i].Name + "</td><td>" + userList[i].Username + "</td><td style='display:none' name='Id'>" + userList[i].SystemUserId + "</td><td>" +
                    userList[i].RoleIdName + "</td><td>" + userList[i].Email + "<ul class='actions'><li class='last'><a class='systemuser2 edit1'>编辑</a>  <a class='systemuser2 delete1' >删除</a></li></ul>" + "</td>";
                var row = document.createElement("tr");
                row.innerHTML = content;
                tbody.append(row);
            }

           

            $(".edit1").click(function () {
                location.href = "user-profile.html?id=" + $(this).parent().parent().parent().parent().find("[name='Id']").text();
            })

            $(".delete1").click(function () {
                if (confirm("确定删除？")) {
                    var jsonPara = {
                        userid: parseInt($(this).parent().parent().parent().parent().find("[name='Id']").text())
                    }
                    $.ajax({
                        type: "post",
                        url: Globals.ServiceUrl + "DeleteUser",
                        data: JSON.stringify(jsonPara),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            var s = JSON.parse(data.d);
                            if (s) {
                                alert("删除成功");
                                window.location.reload();
                            } else {
                                alert("删除失败");
                            }
                        }, error: function (xhr) {
                            alert(xhr);
                        }

                    })
                }
            })
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}