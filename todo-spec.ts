import 'jasmine';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';
import { async } from '@angular/core/testing';


/*describe('angularjs homepage todo list', function() {
    /*it('should have a title', function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
        expect(browser.getTitle()).toEqual('Super Calculator');
    });*/

    /*it('should add a todo', async() => {


        browser.get('http://localhost:4200').then(function(){
            console.log("Executed");
        });

        let a = await (browser.getTitle())

        expect(a).toEqual('Super Calculator');
        /*expect(document.getElementById('deadline').textContent).toContain('Fri Mar 08 2019 18:00:00 GMT+0300 (GMT+03:00)');*/

        /*let tmp = element(by.id('deadline'));
        console.log(tmp.getText());
        expect(tmp.getText()).toBe('Fri Mar 08 2019 18:00:00 GMT+0300 (GMT+03:00)');*/

        /*element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        element(by.css('[value="add"]')).click();

        var todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).toEqual(3);
        expect(todoList.get(2).getText()).toEqual('write first protractor test');

        // You wrote your first test, cross it off the list
        todoList.get(2).element(by.css('input')).click();
        var completedAmount = element.all(by.css('.done-true'));
        expect(completedAmount.count()).toEqual(2);
    });
});*/


describe('protractor with typescript typings', () => {
  beforeEach(async() => {
    await browser.get('http://localhost:4200');
  });
  


  it('test', async()=>{ 
    browser.ignoreSynchronization = true
    //console.log(await element(by.id("highestBidder")).getText());  
    expect<any>(await element(by.id("highestBidder")).getText()).toContain('User');
  })

  /*it('should greet the named user', () => {
    element(by.model('yourName')).sendKeys('Julie');
    let greeting = element(by.binding('yourName'));
    expect<any>(greeting.getText()).toEqual('Hello Julie!');
  });

  it('should list todos', function() {
    let todoList = element.all(by.repeater('todo in todoList.todos'));
    expect<any>(todoList.count()).toEqual(2);
    expect<any>(todoList.get(1).getText()).toEqual('build an angular app');
  });*/
});