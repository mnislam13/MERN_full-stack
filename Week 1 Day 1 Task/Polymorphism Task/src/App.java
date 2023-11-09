public class App {
    public static void main(String[] args) throws Exception {
        //System.out.println("Hello, World!");
        Bag bag = new Bag();

        Coin coin1 = new Coin(1,2);
        if(bag.canAddItem(coin1)){
            coin1.itemAdded();
            bag.addItem(coin1);
        }

        Item rareItem1 = new RareItem(7,5000);
        if(bag.canAddItem(rareItem1)){
            rareItem1.itemAdded();
            bag.addItem(rareItem1);
        }

        Item crossbow1 = new Crossbow(50,100);
        if(bag.canAddItem(crossbow1)){
            crossbow1.itemAdded();
            bag.addItem(crossbow1);
        }

        Item key1 = new Key(1,1234);
        if(bag.canAddItem(key1)){
            key1.itemAdded();
            bag.addItem(key1);
        }

        Item laptop1 = new Laptop(20,"hp",512);
        if(bag.canAddItem(laptop1)){
            laptop1.itemAdded();
            bag.addItem(laptop1);
        }

        Item book1 = new Book(5,300);
        if(bag.canAddItem(book1)){
            book1.itemAdded();
            bag.addItem(book1);
        }

        Item poolcue1 = new PoolCue(13,60);
        if(bag.canAddItem(poolcue1)){
            poolcue1.itemAdded();
            bag.addItem(poolcue1);
        }

        Item commonItem1 = new CommonItem(4,150);
        if(bag.canAddItem(commonItem1)){
            commonItem1.itemAdded();
            bag.addItem(commonItem1);
        }
        
    }
}
