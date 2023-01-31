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
    role: {
      type: DataTypes.STRING,
    },
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
