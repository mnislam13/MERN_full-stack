public class Bag {
    int currentWeight;
     //boolean canAddItem(Item item);
    Bag(){
        this.currentWeight=0;
    }
    boolean canAddItem(Item item){
        if(currentWeight + item.weight > 50){
            System.out.println("OOPs! Capacity overloaded.");
            return false;
        }else{
            return true;
        }
    }
    void addItem(Item item){
        currentWeight=currentWeight + item.weight;
        System.out.println("Current Weight is: "+currentWeight);
    }
}

