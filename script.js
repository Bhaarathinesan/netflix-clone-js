const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

    const value =
    document.getElementById("searchInput").value;

    if(value.trim() === ""){
        alert("Please enter a movie name");
        return;
    }

    alert(`Searching for: ${value}`);

});