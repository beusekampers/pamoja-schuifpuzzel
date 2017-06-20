# pamoja-schuifpuzzel
A small side project game

### Demo
https://markjhvonk.github.io/pamoja-schuifpuzzel/

### Installatie handleiding
1. Download of fork het project.
2. zet de contents uit het "docs" mapje over naar je gewenste locatie.
3. navigeer naar die locatie om te spelen!

### Classes
Ik heb classes gebruikt om bepaalde onderdelen in mijn game te kunnen aanspreken. Eigenlijk om heen de structuur van mijn game op orde te houden.

### Instances
Ik heb instances gebruikt bij het aanroepen van de verschillende game elementen (classes) om ze visueel in beeld te brengen. Bijvoorbeeld de meubels, coins, speler etc...

### Encapsulation
Met encapsulation heb ik er voor gezorgd dat alle variables en functies binnen mijn classes correct afgeschermd worden. Dit is handig wanneer er iemand anders aan mijn game gaat zitten dan weet hij wat hij waar wel en niet mag gebruiken en aanpassen.

### Composition
Met behulp van composition heb ik er voor gezorgd dat bepaalde classes andere classes aan kunnen maken. Bijvoorbeeld binnen de class "game" worden de coins, furniture en characters/players aangemaakt.

### Inherticance
Mijn class furniture heeft meerdere classes die deze extenden; sofa, table & bed. Deze erfen in principe alle onderdelen van de furniture class maar zorgen alleen voor duidelijkheid binnen de code en de texture.

![alt text](https://github.com/markjhvonk/pamoja-schuifpuzzel/blob/master/pamoja-schuifpuzzel-uml-v2.jpg "UML")
