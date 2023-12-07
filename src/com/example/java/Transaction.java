package src.com.example.java;

import java.util.Date;

public class Transaction {

    private String type;
    private double amount;
    private Date timestamp;
    private String category; 

    public Transaction(String type, double amount) {
        this.type = type;
        this.amount = amount;
        this.timestamp = new Date();
    }

    public Transaction(String type, double amount, String category) {
        this.type = type;
        this.amount = amount;
        this.timestamp = new Date();
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public double getAmount() {
        return amount;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getCategory() {
        return category;
    }

    @Override
    public String toString() {
        if (category != null) {
            return String.format("%s: %.2f (%s) - %s", type, amount, timestamp, category);
        } else {
            return String.format("%s: %.2f (%s)", type, amount, timestamp);
        }
    }
}
