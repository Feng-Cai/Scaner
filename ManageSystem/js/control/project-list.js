﻿var projectJs, projectVar;
var SystemUserId = Globals.getCookie("SystemUserId");
var roleid=Globals.getCookie("RoleId")
function initConfig() {
    //初始化模块JS
    projectJs = new Globals.project();

    //页面变量
    projectVar = {
    };

    (function () {

        $("#btnNew").click(function () {
            location.href = "new-project.html";
        })

        $(document).ready(function () {
       
            var jsonPara = {
                userId: SystemUserId,
                roleId:roleid
            };
            $.ajax({
                type: "post",
                url: Globals.ServiceUrl + "GetProjectListByUserId",
                data: JSON.stringify(jsonPara),
                dataType:"json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var projectList = JSON.parse(data.d);
                    
                    var tbody = $("#divProject table tbody").empty();

                    for (i in projectList) {
                        var content = '<tr><td><a href="#" class="no">' + projectList[i].ProjectNo + '</a></td><td class="name">' + projectList[i].Name + '</td><td>' + projectJs.bulidstatus(projectList[i].StatusCode) + '</td><td name="projectid" style="display:none">' + projectList[i].ProjectId+'</td>'+
                                    '<td>' + projectList[i].TesterIdName + 
                                        '<ul class="actions">'+
                                            '<li><a class="project2 edit1" href="project-profile.html?projectId=' + projectList[i].ProjectId + '">编辑</a></li>' +
                                            '<li class="last"><a  class="project2 delete1 ">删除</a></li>'+
                                        '</ul>'+
                                    '</td>'+
                                '</tr>';
                       // var content = "<td>" + projectList[i].ProjectNo + "</td><td>" + projectList[i].Name + "</td><td></td><td class='align-right'></td><td style='display:none' name='Id'>" + projectList[i].SystemUserId + "</td>";
                        var row = document.createElement("tr");
                        row.innerHTML = content;

                        tbody.append(row);
                    }
                    $(".project2.delete1").click(function () {
                        if (confirm("确定删除?")) {
                            var jsonPar = {
                                projectId: $(this).parent().parent().parent().parent().find("[name='projectid']").text()
                            }
                            $.ajax({
                                type: "post",
                                url: Globals.ServiceUrl + "DeleteProject",
                                data: JSON.stringify(jsonPar),
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    var s = JSON.parse(data.d);
                                    if (s) {
                                        alert("删除成功");
                                        window.location.reload();
                                    } else {
                                        alert("请先删除任务");
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


            $("#selectproject").click(function () {
                var jsonPar = {
                    userId: SystemUserId,
                    roleId: roleid,
                    statusCode: Number($("#Project").val())
                };
                $.ajax({
                    type: "post",
                    url: Globals.ServiceUrl + "GetProjectListByStatusCode",
                    data: JSON.stringify(jsonPar),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        var projectList = JSON.parse(data.d);

                        var tbody = $("#divProject table tbody").empty();

                        for (i in projectList) {
                            var content = '<tr><td><a href="#" class="no">' + projectList[i].ProjectNo + '</a></td><td class="name">' + projectList[i].Name + '</td><td>' + projectJs.bulidstatus(projectList[i].StatusCode) + '</td><td name="projectid" style="display:none">' + projectList[i].ProjectId + '</td>' +
                                        '<td>' + projectList[i].TesterIdName +
                                            '<ul class="actions">' +
                                                '<li><a class="project2 edit1" href="project-profile.html?projectId=' + projectList[i].ProjectId + '">编辑</a></li>' +
                                                '<li class="last"><a  class="project2 delete1 ">删除</a></li>' +
                                            '</ul>' +
                                        '</td>' +
                                    '</tr>';
                            // var content = "<td>" + projectList[i].ProjectNo + "</td><td>" + projectList[i].Name + "</td><td></td><td class='align-right'></td><td style='display:none' name='Id'>" + projectList[i].SystemUserId + "</td>";
                            var row = document.createElement("tr");
                            row.innerHTML = content;

                            tbody.append(row);
                        }
                        $(".project2.delete1").click(function () {
                            if (confirm("确定删除?")) {
                                var jsonPar = {
                                    projectId: $(this).parent().parent().parent().parent().find("[name='projectid']").text()
                                }
                                $.ajax({
                                    type: "post",
                                    url: Globals.ServiceUrl + "DeleteProject",
                                    data: JSON.stringify(jsonPar),
                                    contentType: "application/json; charset=utf-8",
                                    success: function (data) {
                                        var s = JSON.parse(data.d);
                                        if (s) {
                                            alert("删除成功");
                                            window.location.reload();
                                        } else {
                                            alert("请先删除任务");
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
            })
        });


    })();
}

$(function () {
    initConfig();
});

function Page(number) {
    var jsonpara = {
        pageNo:number
    }

}
