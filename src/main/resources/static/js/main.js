var hostForTest = 'http://localhost:8080'; // make this empty string on prod

$(document).ready(function(){
    new Vue({
      el: '#vue-topiclist',
      data () {
        return {
          topicList: null,
          loading: true,
          empty: false,
          errored: false
        }
      },
      mounted () {
        axios
          .get('http://localhost:8080/topics/')
          .then(response => {
                  if(response.data.length == 0) this.empty = true;
                  this.topicList = response.data
                })
          .catch(error => {
                  console.log(error)
                  this.errored = true
                })
          .finally(() => this.loading = false)
      }
    });

    var recordlist = new Vue({
      el: '#vue-recordlist',
      data () {
        return {
          recordList: null,
          loading: true,
          empty: false,
          errored: false
        }
      },
      mounted () {
        axios.get(hostForTest + '/topics/')
          .then(response => {
                  if(response.data.length == 0) this.empty = true;
                  this.topicList = response.data
                })
          .catch(error => {
                  console.log(error)
                  this.errored = true
                })
          .finally(() => this.loading = false)
      }
    });

    function showTopicRecords(name, event){
        $(".topic-name").removeClass("selected");
        event.target.classList.add('selected');
        axios.get(hostForTest + "/topics/" + name + "/records")
          .then(response => this.$emit('login-success', response.data.json))
          .catch(error => {
                  console.log(error)
                  this.errored = true
                })
          .finally(() => this.loading = false)
    }

    Vue.component('button-topic', {
      props: ['topic'],
      methods: {
       showTopicRecords: showTopicRecords
      },
      template: '<button class="topic-name" @click="showTopicRecords(topic.name, $event)">{{topic.name}} ({{topic.lag}})</button>'
    });
});