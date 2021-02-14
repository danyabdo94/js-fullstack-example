const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const resolvers = {
    Query: {
        async user(root, { id }, { models, isAuth, loggedUserId }) {
            if(!isAuth) throw new AuthenticationError('you must be logged in'); 
            return models.User.findById(id)
        },
        async allPosts(root, args, { models, isAuth, loggedUserId }) {
            if(!isAuth) throw new AuthenticationError('you must be logged in'); 
            return models.Post.findAll()
        },
    },
    Mutation: {
        async createUser(root, { name, email, password }, { models, isAuth, loggedUserId }) {
            if(!isAuth) throw new AuthenticationError('you must be logged in'); 
            return models.User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            })
        },
        async createPost(root, { userId, title }, { models, isAuth, loggedUserId }) {
            if(!isAuth) throw new AuthenticationError('you must be logged in'); 
            return models.Post.create({ userId, title })
        },
        async login(_, { email, password }, { models }) {
            try {
                const user = await models.User.findOne({ where: { email } })
                if (!user) {
                    throw new Error('No user with that email')
                }
                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) {
                    throw new Error('Incorrect password')
                }
                // return jwt
                const token = jsonwebtoken.sign(
                    { id: user.id, email: user.email },
                    config.JWT_SECRET,
                    { expiresIn: '1d' }
                )
                return {
                    token, user
                }
            } catch (error) {
                throw new Error(error.message)
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
    }
}

module.exports = resolvers
