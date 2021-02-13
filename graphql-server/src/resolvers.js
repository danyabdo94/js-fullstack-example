const bcrypt = require('bcryptjs')


const resolvers = {
    Query: {
        async user(root, { id }, { models }) {
            return models.User.findById(id)
        },
        async allPosts(root, args, { models }) {
            return models.Post.findAll()
        },
    },
    Mutation: {
        async createUser(root, { name, email, password }, { models }) {
            return models.User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            })
        },
        async createPost(root, { userId, title }, { models }) {
            return models.Post.create({ userId, title })
        }
    },
    User: {
        async posts (user) {
            return user.getPosts()
        }
    },
    Post: {
        async user (post) {
            return post.getUser()
        }
    }
}

module.exports = resolvers
