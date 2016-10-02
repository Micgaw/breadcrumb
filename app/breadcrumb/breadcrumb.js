/**
 * Created by Michał on 2016-09-29.
 */
'use strict';

angular.module('breadcrumb', []);

angular.module('breadcrumb').directive('step', [function() {
    return {
        restrict: 'A',
        scope: {
            data: '=',
            action: '&'
        },
        replace: true,
        templateUrl: 'step/step.html'
    }
}]);

angular.module('breadcrumb').controller('BreadcrumbCtrl', function($scope, $location, serviceBreadcrumb) {
    $scope.steps = serviceBreadcrumb.getSteps();
    var loc = $location.path();

    //-------------------- Predefined step attributes ----------------------//

    var colors = ['#80ff80', '#9999ff', '#ff8080'];
    var titles = ['Accounts', 'Calls', 'Ghost', 'Client', 'Photo',
        'Accommodation', 'Appointments', 'Shopping', 'Log in'];
    var icons = [
        {pic:'fa fa-briefcase fa-3x',title: 'Accounts'},
        {pic:'fa fa-phone fa-3x', title: 'Calls'},
        {pic:'fa fa-snapchat-ghost fa-3x',title: 'Ghost'},
        {pic:'fa fa-user fa-3x', title: 'Client'},
        {pic:'fa fa-camera-retro fa-3x', title: 'Photo'},
        {pic:'fa fa-bed fa-3x', title: 'Accommodation'},
        {pic:'fa fa-calendar fa-3x', title: 'Appointments'},
        {pic:'fa fa-cart-plus fa-3x', title: 'Shopping'},
        {pic:'fa fa-key fa-3x', title: 'Log in'}
    ];
    var attributes = [
        {attribute: 'Attribute1', value: 'Value1'},
        {attribute: 'Attribute2', value: 'Value2Value2Value2'},
        {attribute: 'Attribute3', value: 'Value3'},
        {attribute: 'Attribute4', value: 'Value4Value4Value4'},
        {attribute: 'Attribute5', value: 'Value5'},
        {attribute: 'Attribute6', value: 'Value6Value6Value6'},
        {attribute: 'Attribute7', value: 'Value7'},
        {attribute: 'Attribute8', value: 'Value8Value8Value8'},
        {attribute: 'Attribute9', value: 'Value9'}
    ];
    var actions = [
        writeToConsole,
        displayAlert,
        goToLink
    ];

    //-------------------- Predefined actions ----------------------//

    function writeToConsole(){
        console.log("Step clicked!");
    }
    $scope.writeToConsole = writeToConsole;

    function displayAlert() {
        alert("Step clicked!");
    }
    $scope.displayAlert = displayAlert;

    function goToLink(link) {
        if(link){
            window.location.assign(link);
        } else{
            window.location.assign("http://www.google.com");
        }
    }
    $scope.goToLink = goToLink;

    // -------------------------------------------------------------//

    if (loc === '' || loc === '/'){
        $scope.steps = [
            {
                id: 0,
                color: '#80ff80',     //green
                title: 'Accounts',
                icons: [{pic:'fa fa-briefcase fa-3x',title: 'Accounts'}],
                content: [
                    {attribute: 'Type', value: 'Deposit'},
                    {attribute: 'Age', value: 'from 29 years to 80 years'}],
                actionName: goToLink,
                actionParameters: ["https://pilab.pl"]
            },
            {
                id: 1,
                color: '#9999ff',   //blue
                title: 'Calls',
                icons: [
                    {pic:'fa fa-phone fa-3x', title: 'Calls'}],
                content: [
                    {attribute: 'Type', value: 'Business'},
                    {attribute: 'Number', value: '608 123 456'},
                    {attribute: 'Fax', value: '984 645 123'}],
                actionName: displayAlert,
                actionParameters: null
            },
            {
                id: 2,
                color: '#ff8080',    //red
                title: 'Client',
                icons: [{pic:'fa fa-user fa-3x', title: 'Client'}],
                content: [{attribute: 'Name', value: 'John Snow'}],
                actionName: writeToConsole,
                actionParameters: null
            }
        ];

    } else {
        var stepsTable = loc.split("/");
        for (var j=1;j<stepsTable.length;j++){
            addStepWithTitle(stepsTable[j]);
        }
    }
    serviceBreadcrumb.setSteps($scope.steps);

    //-------------------- Generating new step ----------------------//

    function addStep(){
        $scope.steps.push({
            id: $scope.steps.length,
            color: colors[Math.floor((Math.random() * 3))],
            title: titles[Math.floor((Math.random() * 9))],
            icons: getRandomObjectsFromArray(Math.floor((Math.random() * 3)+1),icons),
            content: getRandomObjectsFromArray(Math.floor((Math.random() * 4)+1),attributes),
            actionName: actions[Math.floor((Math.random() * actions.length))],
            actionParameters: null
        });
    }
    $scope.addStep = addStep;

    function addStepWithTitle(title){
        $scope.steps.push({
            id: $scope.steps.length+1,
            color: colors[Math.floor((Math.random() * 3))],
            title: title,
            icons: getRandomObjectsFromArray(Math.floor((Math.random() * 3)+1),icons),
            content: getRandomObjectsFromArray(Math.floor((Math.random() * 4)+1),attributes),
            actionName: actions[Math.floor((Math.random() * actions.length))],
            actionParameters: null
        });
    }
    $scope.addStepWithTitle = addStepWithTitle;

    //------------------- Actions handling ------------------------//

    function getAction(actionName,parameters){
        actionName.apply(null,parameters);
    }
    $scope.getAction = getAction;

    //--------------------------------------------------------------//

    function getRandomObjectsFromArray(number, array){
        var tempArray = array.slice();
        var result =[];
        var id;
        for (var i=0;i<number;i++){
            id = Math.floor((Math.random() * (9-i)));
            result.push(tempArray[id]);
            tempArray.splice(id,1);
        }
        return result;
    }
});

//------------------------ API for new actions ---------------------//

angular.module('breadcrumb').service('serviceBreadcrumb', function() {
    var steps = [];
    function getStepIndexFromStepId(stepId){
        for(var i=0;i<steps.length;i++){
            if (steps[i].id === stepId){
                return i;
            }
        }
        return -1;
    }

    return {
        getSteps: function () {
            return steps;
        },
        setSteps: function (input) {
            steps = input;
        },
        setNewActionToStep: function(stepId,action,parameters){
            console.log('setNewActionToStep');
            var index = getStepIndexFromStepId(stepId);
            if (index === -1) {
                console.log('Step with id: ' + stepId + ' not found!');
            } else {
                steps[index].actionName = action;
                steps[index].actionParameters = parameters;
            }
        }
    };
});