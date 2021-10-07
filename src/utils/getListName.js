export default ({ lists }) => {
  let listName;

  while (true) {
    listName = prompt(
      "Enter list name (only letters, numbers and spaces)",
      "Custom"
    );

    // Cancel prompt
    if (!listName) {
      return;
    }

    const present = lists.find(
      (e) => e.toUpperCase() === listName.toUpperCase()
    );
    if (present) {
      alert("List is already present");
    } else {
      const regex = /^[A-Z0-9 ]+$/i;
      if (regex.test(listName)) {
        break;
      }
    }
  }
  return listName;
};
