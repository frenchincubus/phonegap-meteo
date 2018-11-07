/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 const loader = $('.loader');
 loader.hide();

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// function getMeteo () {
//     const connexion = new XMLHttpRequest();
//     const city = document.getElementById('city').value;
//     const ville = document.getElementById('resultCity');
//     const temp = document.getElementById('resultTemperature');
//     const icon = document.getElementById('resultIcon');

//     if (city.length > 0) {
        
//         connexion.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&units=metric&appid=0ee3c4aa3624c90a9c26a1c9fba4d06d`, false );
//         connexion.send();
//         if (connexion.readyState == 4) {
//             const res = JSON.parse(connexion.responseText);
//             if (res.cod == 200) {
//                 ville.textContent = res.name;
//                 temp.textContent = res.main.temp +'°C';
//                 icon.innerHTML = `<img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png" width="150px">`;
//             } else {
//                 alert(`erreur ${res.cod} : ${res.message}`);
//             }
//         } else {
//             alert('erreur de connexion')
//         }
        
//     } else {
//         alert('Saisissez une ville !');
//     }
// }

function submitCity() {
    var city = $("#city");

    if (city.val().length <= 0) {
        alert('vous devez saisir une ville');
        return;
    }

    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+city.val()+',fr&units=metric&appid=0ee3c4aa3624c90a9c26a1c9fba4d06d';

    // console.log('url'+url);

    loader.show();

    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        success: function(response) {
            loader.hide();
            var json = response;
            var resultCity = $('#resultCity');
            var resultTemperature = $('#resultTemperature');
            var resultIcon = $('#resultIcon');

            resultCity.html(json.name);
            resultTemperature.html(json.main.temp+'°C');
            resultIcon.html('<img src="http://openweathermap.org/img/w/'+json.weather[0].icon+'.png" width="100px" />')
        },
        error: function (response) {
            loader.hide();
            var json = response.responseJSON;
            alert(json.message)
        }
    });
}