def add_income(amount):
  """
  Adds income to the wallet and updates the balance and history.

  Args:
    amount: The amount of income to add.
  """
  global balance, transactions, history
  balance += amount
  transactions.append({"type": "income", "amount": amount})
  history.append({"action": "Added income", "amount": amount})
  print(f"Added {amount} to your wallet. New balance: {balance}")

def subtract_expense(amount):
  """
  Subtracts expense from the wallet and updates the balance and history.

  Args:
    amount: The amount of expense to subtract.
  """
  global balance, transactions, history
  if amount > balance:
    print("Insufficient funds")
    return
  balance -= amount
  transactions.append({"type": "expense", "amount": amount})
  history.append({"action": "Subtracted expense", "amount": amount})
  print(f"Subtracted {amount} from your wallet. New balance: {balance}")

def view_balance():
  """
  Displays the current balance and transactions.
  """
  global balance, transactions
  print(f"Current balance: {balance}")
  print(f"Transactions:\n{transactions}")

def view_history():
  """
  Displays the history of all actions performed in the wallet.
  """
  global history
  print("--- History ---")
  for entry in history:
    print(f"{entry['action']}: {entry['amount']}")
  print("")

def flush_wallet():
  """
  Flushes the wallet by removing all transactions and history.

  Prompts for confirmation before performing the action.
  """
  global balance, transactions, history
  confirmation = input("Are you sure you want to flush your wallet? This will remove all transactions and history. (y/n): ")
  if confirmation.lower() == "y":
    balance = 0
    transactions = []
    history = []
    print("Wallet flushed successfully.")
  else:
    print("Flushing canceled.")

def exit_application():
  """
  Exits the application.
  """
  print("Exiting the application.")
  exit()

def main_menu():
  """
  Displays the main menu and handles user input.
  """
  global balance, transactions, history
  print("Welcome to your Wallet Manager!")
  print("1. Add Income")
  print("2. Subtract Expense")
  print("3. View Balance")
  print("4. View History")
  print("5. Flush Wallet")
  print("6. Exit")

  choice = input("Enter your choice: ")
  if choice == "1":
    amount = float(input("Enter income amount: "))
    add_income(amount)
    main_menu()
  elif choice == "2":
    amount = float(input("Enter expense amount: "))
    subtract_expense(amount)
    main_menu()
  elif choice == "3":
    view_balance()
    main_menu()
  elif choice == "4":
    view_history()
    main_menu()
  elif choice == "5":
    flush_wallet()
    main_menu()
  elif choice == "6":
    exit_application()
  else:
    print("Invalid option.")
    main_menu()

if __name__ == "__main__":
  balance = 0
  transactions = []
  history = []

  main_menu()
