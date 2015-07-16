
var initTable = function(data) {
    $('#tab').empty();
    $(function() {
        [].forEach.call(data,function(val) {
        $("<tr>" + "<th id=" + val.student_id + ">" + "delete" + "<th>" + val.student_id + "<th>" + val.student_name + "</tr></th>").appendTo("#tab");
        })
    })
}
var displayInfo = function() {
    $.get("/score", {}, function(data) {
        initTable(data);
    });
}

$(function() {
    displayInfo();

    $("#tab").on("click", function(event) {

        if(confirm("你确信要删除此条数据吗？")) {
            var id = event.target.id;

            if (id === "") {
                return;
            }

            $.ajax({
                url: '/deleteId',
                type: 'delete',
                data: {
                    id: id
                }
            })
            displayInfo();
        } else {}
    })

    $("#button").on("click", function(event) {
        var name = $("#studentName").prop("value");

        $.post("/addInfo", {
            name: name
        }, function() {})

        displayInfo();
    })
})
