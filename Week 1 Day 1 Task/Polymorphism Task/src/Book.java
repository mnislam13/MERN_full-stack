public class Book extends Item {
    int pages;
    Book(int weight, int pages){
        this.weight=weight;
        this.pages=pages;
    }
    void itemAdded(){
        System.out.println("Book added!");
    }
}
