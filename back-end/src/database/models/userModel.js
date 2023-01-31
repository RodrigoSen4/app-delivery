module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
<<<<<<< HEAD
    role: {
      type: DataTypes.STRING,
    },
=======
    role: { type: DataTypes.STRING, defaultValue: 'customer' }
>>>>>>> ea6b2de5177457c94d661e89910f4df49ae02346
  },
  {
    timestamps: false,
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale,
      { foreignKey: 'userId', as: 'sales' },
      { foreignKey: 'sellerId', as: 'sales' }
    );
  };

  return User;
};
