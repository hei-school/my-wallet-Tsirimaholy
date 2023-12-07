local balance = 0
local transactions = {}
local history = {}

function add_income(amount)
  balance = balance + amount
  table.insert(transactions, { type = "income", amount = amount })
  table.insert(history, { action = "Added income", amount = amount })
  print("Added " .. amount .. " to your wallet. New balance: " .. balance)
end

function subtract_expense(amount)
  if amount > balance then
    print("Insufficient funds")
  else
    balance = balance - amount
    table.insert(transactions, { type = "expense", amount = amount })
    table.insert(history, { action = "Subtracted expense", amount = amount })
    print("Subtracted " .. amount .. " from your wallet. New balance: " .. balance)
  end
end

function view_balance()
  print("Current balance: " .. balance)
  print("Transactions:")
  for _, transaction in ipairs(transactions) do
    print(string.format("[%s] %.2f", transaction.type, transaction.amount))
  end
end

function view_history()
  print("--- History ---")
  for _, entry in ipairs(history) do
    print(string.format("%s: %.2f", entry.action, entry.amount))
  end
end

function flush_wallet()
  print("Are you sure you want to flush your wallet? This will remove all transactions and history.")
  local answer = io.read()
  if answer == "y" or answer == "yes" then
    balance = 0
    transactions = {}
    history = {}
    print("Wallet flushed successfully.")
  else
    print("Flushing canceled.")
  end
end

-- Exit application
function exit_application()
  print("Exiting the application.")
  os.exit()
end

-- Main menu
function main_menu()
  print("Welcome to your Wallet Manager!")
  print("1. Add Income")
  print("2. Subtract Expense")
  print("3. View Balance")
  print("4. View History")
  print("5. Flush Wallet")
  print("6. Exit")

  local choice = io.read()
  choice = tonumber(choice)

  if not choice or choice < 1 or choice > 6 then
    print("Invalid option.")
    main_menu()
  end

  if choice == 1 then
    print("Enter income amount: ")
    local amount = io.read()
    amount = tonumber(amount)
    add_income(amount)
    main_menu()
  elseif choice == 2 then
    print("Enter expense amount: ")
    local amount = io.read()
    amount = tonumber(amount)
    subtract_expense(amount)
    main_menu()
  elseif choice == 3 then
    view_balance()
    main_menu()
  elseif choice == 4 then
    view_history()
    main_menu()
  elseif choice == 5 then
    flush_wallet()
    main_menu()
  elseif choice == 6 then
    exit_application()
  end
end

main_menu()
