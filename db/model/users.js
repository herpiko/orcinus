var mongoose = require('mongoose')
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

UserSchema = new Schema({
  email: { 
  	type: String, 
		unique: true
	},
  firstname: { type: String },
  lastname: { type: String },
  password: { 
  	type: String,
  	required: true
  },
  username: { 
  	type: String,
		unique: true
	},
  phone: { 
    type: String
  },
  admin: { type: Boolean },
  verify: {
    type: Boolean,
    default: true
  }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePass = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Users', UserSchema);
