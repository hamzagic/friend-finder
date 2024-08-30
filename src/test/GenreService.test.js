
import { expect } from 'chai';
import sinon from 'sinon';
import Genre from '../models/Genre.js'; 
import { createGenreService } from '../services/GenreService.js';
import mongoose from 'mongoose';

describe('Genre Service', function() {
    let saveStub;

    beforeEach(function() {
        sinon.stub(mongoose, 'connect').resolves();  
    });

    afterEach(function() {
        // Restore the original method
        sinon.restore();
    });

    it.skip('should create a new genre successfully', async function() {
        const genreData = { name: 'Science Fiction', subject: 'Drama', description: 'Sci-fi genre' };
        const savedGenre = { ...genreData, _id: '123' };
        sinon.stub(Genre.prototype, 'save').resolves(savedGenre);

        const result = await createGenreService(genreData.name, genreData.subject, genreData.description);

        expect(result).to.have.property('name', 'Science Fiction');
        expect(result).to.have.property('description', 'Sci-fi genre');
    });

    it.skip('should throw an error when creation fails', async function() {
        saveStub.rejects(new Error('Error creating genre')); // Simulate a failure

        try {
            await createGenreService('Drama', '', 'Drama genre');
        } catch (error) {
            expect(error.message).to.equal('Error creating genre');
        }
    });
});
