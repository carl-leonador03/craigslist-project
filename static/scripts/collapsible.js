var collapsibles = document.getElementsByClassName("collapsible-header-title");

for (let i = 0; i < collapsibles.length; i++)
{
    if (!collapsibles[i].classList.contains("single"))
    {
        collapsibles[i].addEventListener("click", function()
        {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight)
            {
                content.style.maxHeight = null;
                content.style.paddingTop = null;
                content.style.paddingBottom = null;
                
                collapsibles[i].lastChild.textContent = "arrow_drop_down";
            }
            else
            {
                content.style.paddingTop = "15px";
                content.style.paddingBottom = "15px";
                content.style.maxHeight = content.scrollHeight + "px";
                collapsibles[i].lastChild.textContent = "arrow_drop_up";
            }
        }
        )
    }
}