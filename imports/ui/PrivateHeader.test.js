import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


import PrivateHeader from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title="Test title"/> )
      // on cherche dans les éléments du DOM un bouton
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');

    })

    it('should use title prop as h1 text', function () {
      const title = 'Test title here';
      // on monte le component 
      const wrapper = mount( <PrivateHeader title={title}/> )
      // on cherche dans les éléments du DOM un h1
      const actualTitle = wrapper.find('h1').text();

      expect(actualTitle).toBe(title);
    })
  })
}