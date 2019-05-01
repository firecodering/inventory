module.exports = (sequelize, DataTypes) => {
    const items = sequelize.define('items', {
       // ItemID: DataTypes.INTEGER(),
        ItemName: DataTypes.STRING(40),
        Supplier: DataTypes.STRING(60),
        CategoryID: DataTypes.INTEGER(),
        QuantityPerUnit: DataTypes.STRING(30),
        UnitPrice: DataTypes.DOUBLE,
        UnitsInStock: DataTypes.BIGINT(),
        UnitsOnOrder: DataTypes.INTEGER(),
        MinStockLevel: DataTypes.INTEGER()
    });
    return items;
 };
