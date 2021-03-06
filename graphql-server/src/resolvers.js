const { AuthenticationError, ApolloError, UserInputError, PubSub } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const pubsub = new PubSub();

const resolvers = {
    Query: {
        async user(root, { id }, { models, isAuth, loggedUserId }) {
            if (!isAuth) throw new AuthenticationError('you must be logged in');
            return models.User.findById(id)
        },
        async allPosts(root, args, { models, isAuth, loggedUserId }) {
            if (!isAuth) throw new AuthenticationError('you must be logged in');
            return models.Post.findAll({ order: [['createdAt', 'DESC']] })
        },
    },
    Mutation: {
        async signup(root, { name, email, password }, { models, isAuth }) {
            const user = await models.User.findOne({ where: { email } })
            if (user) throw new UserInputError('this mail already exists');
            return models.User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            })
        },
        async createPost(root, { title }, { models, isAuth, loggedUserId, loggedUserName }) {
            if (!isAuth) throw new AuthenticationError('you must be logged in');
            pubsub.publish('POST_CREATED', { postCreated: { title } });
            return models.Post.create({ userId: loggedUserId, title })
        },
        async login(_, { email, password }, { models }) {
            try {
                const user = await models.User.findOne({ where: { email } })
                if (!user) {
                    throw new UserInputError('No user with that email')
                }
                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) {
                    throw new UserInputError('Incorrect password')
                }
                // return jwt
                const token = jsonwebtoken.sign(
                    { id: user.id, name: user.name },
                    config.JWT_SECRET,
                    { expiresIn: '1d' }
                )
                return {
                    token, user
                }
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }

    },
    User: {
        async posts(user) {
            return user.getPosts()
        }
    },
    Post: {
        async user(post) {
            return post.getUser()
        }
    },
    Subscription: {
        postCreated: {
            resolve: ({ postCreated }) => {
                return {
                    ...postCreated
                };
            },
            subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
        },
    },
}

module.exports = resolvers
