/**
 * Created by Michał on 2016-10-02.
 */
'use strict';

describe('breadcrumb module', function() {

    describe('breadcrumb Controller', function() {
        var $controller;
        var $scope = {};

        beforeEach(module('breadcrumb'));

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
            var controller = $controller('BreadcrumbCtrl', { $scope: $scope });
        }));

        it('Should define variables and functions on initialization', function() {
            expect('BreadcrumbCtrl').toBeDefined();
            expect($scope.steps).toBeDefined();
            expect($scope.writeToConsole).toBeDefined();
            expect($scope.displayAlert).toBeDefined();
            expect($scope.goToLink).toBeDefined();
            expect($scope.addStep).toBeDefined();
            expect($scope.addStepWithTitle).toBeDefined();
            expect($scope.getAction).toBeDefined();
        });

        it('Should set steps on initialization', function() {
            var expectedSteps = [
                {
                    id: 0,
                    color: '#80ff80',
                    title: 'Accounts',
                    icons: [{pic:'fa fa-briefcase fa-3x',title: 'Accounts'}],
                    content: [
                        {attribute: 'Type', value: 'Deposit'},
                        {attribute: 'Age', value: 'from 29 years to 80 years'}],
                    actionName: $scope.goToLink,
                    actionParameters: ["https://pilab.pl"]
                },
                {
                    id: 1,
                    color: '#9999ff',
                    title: 'Calls',
                    icons: [
                        {pic:'fa fa-phone fa-3x', title: 'Calls'}],
                    content: [
                        {attribute: 'Type', value: 'Business'},
                        {attribute: 'Number', value: '608 123 456'},
                        {attribute: 'Fax', value: '984 645 123'}],
                    actionName: $scope.displayAlert,
                    actionParameters: null
                },
                {
                    id: 2,
                    color: '#ff8080',
                    title: 'Client',
                    icons: [{pic:'fa fa-user fa-3x', title: 'Client'}],
                    content: [{attribute: 'Name', value: 'John Snow'}],
                    actionName: $scope.writeToConsole,
                    actionParameters: null
                }
            ];
            expect($scope.steps).toEqual(expectedSteps);
        });

        it('Should add step', function() {
            var stepsNumber = $scope.steps.length;
            $scope.addStep();
            var newStepsNumber = $scope.steps.length;
            expect(newStepsNumber).toEqual(stepsNumber+1);
        });

        it('Should add step with title', function() {
            var stepsNumber = $scope.steps.length;
            $scope.addStepWithTitle('AAA');
            var newStepsNumber = $scope.steps.length;
            expect(newStepsNumber).toEqual(stepsNumber+1);
            expect($scope.steps[$scope.steps.length-1].title).toEqual('AAA');
        });
    });
});