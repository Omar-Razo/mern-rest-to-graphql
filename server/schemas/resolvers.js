const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }

            const user = await User.findById(context.user._id);
            return user;
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw AuthenticationError
            }

            const token = signToken(user);

            return { token }
        },
        addUser: async (parent, args, context, info) => {
            const { email } = args

            const emailRegex = /.+@.+\..+/
            if (!emailRegex.test(email)) {
                throw new Error('Must use a valid email address')
            }

            const user = await User.create(args)

            const token = signToken(user)

            return { token, user }
        },
        saveBook: async (parent, { input }, context) => {

            if (!context.user) {
                throw new Error('Authentication required');
            }

            const user = await User.findByIdAndUpdate(
                context.user._id,
                { $addToSet: { savedBooks: input } },
                { runValidators: true, new: true }
            );

            return user
        },
        deleteBook: async ( parent, { bookId }, context) => {

            if (!context.user) {
                throw new Error('Authentication required');
            }

            const user = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );

            if (!user) {
                throw new Error("Couldn't find user with this id!")
            }

            return user
        }
    },
};

module.exports = resolvers