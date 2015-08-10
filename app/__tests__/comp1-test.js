var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var Comp2 = require('../comp2.jsx');


var instance;
var container = document.createElement("div");

describe('Comp2', () => {
    it('renders', () => {
        var element = TestUtils.renderIntoDocument(<Comp2/>);
        expect('this').toEqual('this');
        //expect(element).toBeTruthy();
    });


});


describe('Comp2 special', function(){

    it('has a method', () => {
        var element = TestUtils.renderIntoDocument(<Comp2/>);
      // expect(element.state.name).toEqual('leo');
    //    var h1 = element.refs.h1;
    //    TestUtils.Simulate.click(h1);
    //    expect(element.state.name).toEqual('gui');
        var x  = element.handleClick();
        expect(x).toEqual(101);


    });


});



/*
describe('Comp2', function(){
    beforeEach(function() {
        // This component broadcasts events and has lifecycle methods
        // so it should be rendered into an accessible container.
        instance = React.render(<Comp2 />, container);

        this.eventSpy = jasmine.createSpy('hi');
        container.addEventListener("broadcast", this.eventSpy, false);
    });

    afterEach(function() {
        container.removeEventListener("broadcast", this.eventSpy, false);
    });

    it('has a method', () => {
        TestUtils.Simulate.click(instance.getDOMNode());
        expect('this').toEqual('this');
        expect(this.eventSpy).toHaveBeenCalledWith("some", "data");
        //expect(element).toBeTruthy();
    });


});

*/

