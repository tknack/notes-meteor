import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes'

if (Meteor.isServer){
  const userId = 'testUserId1';
  const noteId = 'testNoteId1';

  describe('notes', function () {
    beforeEach(function () {
      Notes.remove({});
      Notes.insert({
        _id: noteId,
        title: 'My Title',
        body: 'My body for note',
        updateAt: 0,
        userId
      })
    });

    it('should insert new note', function () {
      // const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId })

      expect(Notes.findOne({ _id, userId })).toBeTruthy(); // toExist
    })

    it('should not insert note if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert'](); // sans userId
      }).toThrow()
    })

    it('should remove note', function () {
      // const userId = 'testUserId1';
      Meteor.server.method_handlers['notes.remove'].apply({ userId }, [noteId]); // remove correct

      expect(Notes.findOne({_id: noteId})).toBeFalsy(); // remplace toNotExist
    })

    it('should not remove note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteId]) // pas de userId
      }).toThrow()
    })

    it('should not remove note if invalid _id', function () {
      // const userId = 'testUserId1';
      expect (() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId }, []) // pas de noteId
      }).toThrow();
    })

  })
}