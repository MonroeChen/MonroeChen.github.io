document.addEventListener("DOMContentLoaded", function() {

    var chart = echarts.init(
        document.getElementById('china-map')
    );


    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')

        .then(response => response.json())

        .then(chinaJson => {


            echarts.registerMap(
                'china',
                chinaJson
            );


            var option = {

                title: {
                    text: 'Travel Map',
                    left: 'center'
                },


                tooltip: {
                    trigger: 'item'
                },


                series: [{

                    type: 'map',

                    map: 'china',

                    roam: true,


                    label: {
                        show: true
                    },


                    emphasis: {

                        label: {
                            show: true
                        }

                    }

                }]

            };


            chart.setOption(option);



            chart.on('click', function(params) {


                fetch('/js/travel.json')

                    .then(response => response.json())

                    .then(data => {


                        const province = data[params.name];


                        if(province){


                            window.location.href =
                            province.url;


                        }else{


                            alert(
                                params.name + " 暂无旅行记录"
                            );


                        }


                    });


            });



        });


});