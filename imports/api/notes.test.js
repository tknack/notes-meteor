import {
  Meteor
} from 'meteor/meteor';
import expect from 'expect';

import {
  Notes
} from './notes'

if (Meteor.isServer) {


  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };


    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne)
    });

    it('should insert new note', function () {
      // const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({
        userId: noteOne.userId
      })

      expect(Notes.findOne({
        _id,
        userId: noteOne.userId
      })).toBeTruthy(); // toExist
    })

    it('should not insert note if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert'](); // sans userId
      }).toThrow()
    })

    it('should remove note', function () {
      // const userId = 'testUserId1';
      Meteor.server.method_handlers['notes.remove'].apply({
        userId: noteOne.userId
      }, [noteOne._id]); // remove correct

      expect(Notes.findOne({
        _id: noteOne._id
      })).toBeFalsy(); // remplace toNotExist
    })

    it('should not remove note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]) // pas de userId
      }).toThrow()
    })

    it('should not remove note if invalid _id', function () {
      // const userId = 'testUserId1';
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({
          userId: noteOne.userId
        }, []) // pas de noteId
      }).toThrow();
    })

    it('should update note', function () {
      const title = 'This is an updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        {
          title
        }
      ])

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect([note]).toContainEqual(
        expect.objectContaining({
          title,
          body: noteOne.body
        })
      )
    })
  })
}