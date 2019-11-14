/*
 * train-datamodel2poi
 * https://github.com/fisuda/tutorial
 *
 * Copyright (c) 2019 FISUDA
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    var processIncomingData = function processIncomingData(entities) {
        entities = (typeof entities === 'string') ? JSON.parse(entities) : entities;

        MashupPlatform.wiring.pushEvent('poiOutput', entities.map(processEntity).filter((poi) => {return poi != null;}));
    };

    var processEntity = function processEntity(entity) {
        var coordinates = null;
        if (builders[entity.type] != undefined) {
            if (entity.location != null && typeof entity.location === 'object') {
                coordinates = {
                    system: 'WGS84',
                    lng: parseFloat(entity.location.coordinates[0]),
                    lat: parseFloat(entity.location.coordinates[1])
                };

                return entity2poi(entity, coordinates);
            }
        } else {
            MashupPlatform.operator.log('Entity type is not supported: ' + entity.type);
        }
    };

    var entity2poi = function entity2poi(entity, coordinates) {
        if (builders[entity.type] != undefined) {
            return builders[entity.type](entity, coordinates);
        } else {
            MashupPlatform.operator.log('Entity type is not supported: ' + entity.type);
            return null;
        }
    };

    //
    //  Route
    //
    var renderRoute = function renderRoute(entity, coordinates) {
        var poi = {
            id: entity.id,
            icon: null,
            tooltip: null,
            data: entity,
            title: null,
            infoWindow: null,
            currentLocation: coordinates,
            location: entity.location,
            style: { stroke: {'color': entity.lineColor, 'width': 5} },
            selectable: false
        };

        return poi;
    };

    //
    //  Station
    //
    var renderStation = function renderStation(entity, coordinates) {
        var url = 'images/station.png';

        var icon = {
            anchor: [0.5, 1],
            scale: 0.4,
            src: internalUrl(url)
        };

        var poi = {
            id: entity.id,
            icon: icon,
            tooltip: entity.name,
            data: entity,
            title: entity.name,
            infoWindow: buildStationInfoWindow.call(this, entity),
            currentLocation: coordinates,
            location: {
                'type': 'Point',
                'coordinates': [
                    coordinates.lng,
                    coordinates.lat
                ]
            }
        };

        return poi;
    };

    var internalUrl = function internalUrl(data) {
        var url = document.createElement('a');
        url.setAttribute('href', data);
        return url.href;
    };

    var buildStationInfoWindow = function buildOdptStationInfoWindow(entity) {
        var infoWindow = '<div>';

        infoWindow += '<p><b>Id: </b> ' + entity.id + '</p>';

        infoWindow += '<p><b>Name: </b> ' + entity.name + '</p>';

        infoWindow += '</div>';

        return infoWindow;
    };

    //
    //  Train
    //
    var renderTrain = function renderTrain(entity, coordinates) {
        var icon;

        var png = 'images/train.png';

        icon = {
            anchor: [0.5, 1],
            scale: 0.4,
            src: internalUrl(png)
        };

        var poi = {
            id: entity.id,
            icon: icon,
            tooltip: entity.name,
            data: entity,
            title: entity.name,
            infoWindow: buildTrainWindow.call(this, entity),
            currentLocation: coordinates,
            location: entity.location
        };

        return poi;
    };

    var buildTrainWindow = function buildOdptTrainWindow(entity) {
        var infoWindow = '<div>';

        infoWindow += '<p><b> Id: </b> ' + entity.id + '</p>';

        infoWindow += '<p><b> Name: </b> ' + entity.name + '</p>';

        infoWindow += '</div>';

        return infoWindow;
    };

    var builders = {
        'Station': renderStation,
        'Train': renderTrain,
        'Route': renderRoute,
    };

    MashupPlatform.wiring.registerCallback('entityInput', processIncomingData);

})();
