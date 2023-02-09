
        $.fn.myPlugin = function(data) {
            console.log("Data :" + data);
            $(this)
            .text(data)
            .css({
                "color":"red",
                "background-color":"green",
                "margin":"10px",
                "height":"100px",

            })
            return this;
        }
