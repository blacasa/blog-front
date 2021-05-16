<template>
  <div class="about">
    <h1 class="titre">Bienvenue sur le blog 13 jeux solo</h1>
    <div class="preza">
      Le blog de 13obscur dédié aux jeux solo.
      <br/>
      J'ai découvert les jeux de sociétés modernes aux alentours de 2010. J'ai des goûts assez éclectiques tant en termes de mécaniques, thèmes ou encore nombre de joueur.
    </div>
    <div class="but">
      Ce blog va me permettre de parler de jeux de plateau jouables en solitaire. Je présenterai essentiellement les jeux qui m'ont plu dans leur configuration solo.
      <br/>
      Les articles sont associés à des catégories.
      <br/>
      La catégorie principale est "Avis" qui correspond à des avis sur des jeux auxquels j'ai joué assez de parties pour me faire une idée (en général au moins 10 parties). L'article présente des photos d'une partie présentant la mise en place, un début de partie, et l'état du jeu en fin de partie.
      <br/>
      La catégorie "Express" va regrouper les articles sur des jeux pour lesquels je n'ai pas assez joué pour faire un retour approfondi, ou des jeux sur lesquels je veux faire un premier retour rapide avant un futur article plus détaillé, ou encore des extensions de jeux et pour lesquels il n'est pas utile de faire un article consitant surtout s'il y a déjà un article détaillé sur le jeu de base.
    </div>
    <div class="technique">
      Ce blog est développé par mes soins. Il a été développé avec Vue et Bootstrap pour le front, le backend utilise Node et une base de données MySql. Je peux ainsi faire des tests. C'est pour cela que sur les articles, vous trouverez en bas de page un bouton de lecture qui lira l'article.
    </div>
    <div class="social">
      Vous pourrez me retrouver sur <a href="https://twitter.com/13jeuxsolo">Twitter</a>, sur les forums de TricTrac (et plus particulièrement sur le topic défi solo), ou me contacter <a href="mailto:contact@13jeuxsolo.fr">par mail</a>.
    </div>
  </div>
</template>

<script>

export default {
  layout: (context) => context.$device.isMobile ? 'mobile' : 'default',
}
</script>

<style scoped>
.about {
  margin: 5% 10% 5% 10%;
  text-align: left;
}

.but {
  margin-top: 10px;
}

.preza {
  margin-top: 10px;
}

.social {
  margin-top: 10px;
}

.titre {
  text-align: center;
}

.technique {
  margin-top: 10px;
}
</style>
