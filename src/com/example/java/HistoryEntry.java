package src.com.example.java;

import java.util.Date;

public class HistoryEntry {

    private String action;
    private double amount;
    private Date timestamp;
    private String category;

    public HistoryEntry(String action, double amount) {
        this.action = action;
        this.amount = amount;
        this.timestamp = new Date();
    }

    public HistoryEntry(String action, double amount, String category) {
        this.action = action;
        this.amount = amount;
        this.timestamp = new Date();
        this.category = category;
    }

    public String getAction() {
        return action;
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
            return String.format("%s: %.2f (%s) - %s", action, amount, timestamp, category);
        } else {
            return String.format("%s: %.2f (%s)", action, amount, timestamp);
        }
    }
}
