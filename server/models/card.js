module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('Card', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      matched: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    return Card;
  };
  