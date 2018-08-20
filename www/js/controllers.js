angular.module('starter.controllers', [])
  .controller('DashCtrl', function ($scope, $http, $location) {
    var urlAPI = 'https://rickandmortyapi.com/api/character/';
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.desabilitarBack = true;
    $http.get(urlAPI).success(function (JSON) {
      console.log(JSON);
      console.log('funcionou');
      $scope.characters = JSON.results;
      //Carregar Próxima Pagina
      $scope.loadNextPage = function () {
        var listOfCharacters = [];
        var totalOfCards = JSON.results.length;
        $scope.currentPage++;
        $scope.lastPage = totalOfCards / $scope.pageSize;
        $scope.firstCardOfPage = $scope.pageSize * $scope.currentPage;
        $scope.desabilitarBack = false;
        $scope.desabilitarNext = ($scope.currentPage + 1) == $scope.lastPage;
        for (var i = $scope.firstCardOfPage; i <= totalOfCards; i++) {
          listOfCharacters.push(JSON.results[i]);
        }
        $scope.characters = listOfCharacters;
        $location.hash('header');
      }
      //
      //carregar página anterior
      $scope.loadPreviousPage = function () {
        var listOfCharacters = [];
        var totalOfCards = JSON.results.length;
        $scope.currentPage--;
        $scope.lastPage = totalOfCards / $scope.pageSize;
        $scope.firstCardOfPage = $scope.pageSize * $scope.currentPage;
        $scope.desabilitarNext = false;
        $scope.desabilitarBack = $scope.currentPage == 0;
        console.log($scope.firstCardOfPage)
        for (var i = $scope.firstCardOfPage; i <= totalOfCards; i++) {
          listOfCharacters.push(JSON.results[i]);
        }
        $scope.characters = listOfCharacters;
        $location.hash('header');
      }
      //
    }).error(function (JSON, status, config) {
      console.log('Não Funcionou');
    })
    $scope.alerta = function (character) {
      // Configurações da janela de alerta
      var winW = window.innerWidth;
      var winH = window.innerHeight;
      var dialogoverlay = document.getElementById('dialogoverlay');
      var dialogbox = document.getElementById('dialogbox');
      dialogoverlay.style.display = "block";
      dialogoverlay.style.height = winH + "px";
      dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
      dialogbox.style.top = "100px";
      dialogbox.style.display = "block";
      document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
      //
      $scope.c = character;
      //busca os episódios de cada personagem
      var episodes = [];
      var urlAPI = '';
      for (var i in character.episode) {

        urlAPI = character.episode[i];

        $http.get(urlAPI).success(function (JSON) {
          episodes.push(JSON)

        }).error(function (JSON, status, config) {
          console.log('Não Funcionou');
        })
      }
      //
      $scope.episodes = episodes;
    }

  }).controller('ScrollController', ['$scope', '$location', '$anchorScroll',
    function ($scope, $location, $anchorScroll) {
    }])
  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });

