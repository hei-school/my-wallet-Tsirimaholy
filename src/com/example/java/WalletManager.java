package src.com.example.java;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class WalletManager {

    private double balance;
    private List<Transaction> transactions;
    private List<HistoryEntry> history;

    public WalletManager() {
        this.balance = 0;
        this.transactions = new ArrayList<>();
        this.history = new ArrayList<>();
    }

    public void addIncome(double amount, String category) {
        balance += amount;
        transactions.add(new Transaction("income", amount, category));
        history.add(new HistoryEntry("Added income", amount, category));
        System.out.printf("Added %.2f to your wallet. New balance: %.2f\n", amount, balance);
    }

    public void subtractExpense(double amount, String category) {
        if (amount > balance) {
            System.out.println("Insufficient funds");
            return;
        }
        balance -= amount;
        transactions.add(new Transaction("expense", amount, category));
        history.add(new HistoryEntry("Subtracted expense", amount, category));
        System.out.printf("Subtracted %.2f from your wallet. New balance: %.2f\n", amount, balance);
    }

    public void viewBalance() {
        System.out.printf("Current balance: %.2f\n", balance);
        System.out.println("Transactions:");
        for (Transaction transaction : transactions) {
            System.out.println(transaction);
        }
    }

    public void viewHistory() {
        System.out.println("--- History ---");
        for (HistoryEntry entry : history) {
            System.out.println(entry);
        }
    }

    public void flushWallet() {
        System.out.println("Are you sure you want to flush your wallet? This will remove all transactions and history.");
        System.out.print("(y/n): ");
        Scanner scanner = new Scanner(System.in);
        String answer = scanner.nextLine();

        if (answer.equalsIgnoreCase("y")) {
            balance = 0;
            transactions.clear();
            history.clear();
            System.out.println("Wallet flushed successfully.");
        } else {
            System.out.println("Flushing canceled.");
        }
    }

    public void exitApplication() {
        System.out.println("Exiting the application.");
        System.exit(0);
    }

    public void run() {
        Scanner scanner = new Scanner(System.in);
        String category = "";

        int choice;
        do {
            printMenu();
            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter income amount: ");
                    double income = scanner.nextDouble();
                    System.out.print("Enter category (optional): ");
                    category = scanner.nextLine().trim();
                    addIncome(income, category);
                    break;
                case 2:
                    System.out.print("Enter expense amount: ");
                    double expense = scanner.nextDouble();
                    System.out.print("Enter category (optional): ");
                    category = scanner.nextLine().trim();
                    subtractExpense(expense, category);
                    break;
                case 3:
                    viewBalance();
                    break;
                case 4:
                    viewHistory();
                    break;
                case 5:
                    flushWallet();
                    break;
                case 6:
                    exitApplication();
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        } while (choice != 6);
    }

    public void printMenu() {
        System.out.println("Welcome to your Wallet Manager!");
        System.out.println("1. Add Income");
        System.out.println("2. Subtract Expense");
        System.out.println("3. View Balance");
        System.out.println("4. View History");
        System.out.println("5. Flush Wallet");
        System.out.println("6. Exit");
        System.out.print("Enter your choice: ");
    }

    public static void main(String[] args) {
        new WalletManager().run();
    }

}