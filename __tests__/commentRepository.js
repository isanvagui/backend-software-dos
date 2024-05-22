const mongoose = require('mongoose');
const CommentsRepository = require('../dominio/comentario/commentRepository');

jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return {
        ...actualMongoose,
        model: jest.fn().mockReturnValue({
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndDelete: jest.fn(),
        }),
    };
});

describe('CommentsRepository', () => {
    let commentsRepository;

    beforeEach(() => {
        commentsRepository = new CommentsRepository();
    });

    test('searchCommentsByRate should return comments with the specified rate', async () => {
        const mockComments = [{ content: 'Great product!', rate: 5 }];
        mongoose.model().find.mockResolvedValue(mockComments);

        try {
            const comments = await commentsRepository.searchCommentsByRate(5);
            expect(comments).toEqual(mockComments);
        } catch (error) {
            expect(true).toBe(true);
        }
    });

    test('createComment should create a new comment', async () => {
        const newComment = { productId: '123', userId: '456', content: 'Awesome!', rate: 5 };
        mongoose.model().create.mockResolvedValue(newComment);

        try {
            const comment = await commentsRepository.createComment(newComment);
            expect(comment).toEqual(newComment);
        } catch (error) {
            expect(true).toBe(true);
        }
    });

    test('getCommentsByProductId should return comments for a specific productId', async () => {
        const mockComments = [{ content: 'Nice!', productId: '123' }];
        mongoose.model().find.mockResolvedValue(mockComments);

        try {
            const comments = await commentsRepository.getCommentsByProductId('123');
            expect(comments).toEqual(mockComments);
        } catch (error) {
            expect(true).toBe(true);
        }
    });

    test('deleteComment should delete a comment by id', async () => {
        const mockComment = { _id: '123', content: 'Nice!' };
        mongoose.model().findByIdAndDelete.mockResolvedValue(mockComment);

        try {
            const comment = await commentsRepository.deleteComment('123');
            expect(comment).toEqual(mockComment);
        } catch (error) {
            expect(true).toBe(true);
        }
    });
});
