import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Button,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {connect} from 'react-redux';
import DevFromList from '../../components/DevFromList';
import GitHubApi from '../../services/GitHubApi';
import colors from '../../styles/colors';

class BuscaDevs extends Component {
  /**
   * @type {{isLoading: boolena, devs:[{key: number}]}} state
   */
  state = {
    devs: [],
    page: 1,
    amount: 0,
    isLoading: true,
    loaded: false,
  };

  user = async login => {
    const dev = this.state.devs;
    const usuario = await GitHubApi.getUserByUsername(login);
    dev.push(usuario.data);
    this.setState({devs: dev});

    if (this.state.devs.length === this.state.amount)
      this.setState({loaded: true});
  };

  componentDidMount() {
    this.setState({loaded: false, page: 1, devs: []});
    this.addDev();
  }

  addDev = async () => {
    const city = await AsyncStorage.getItem('city');
    const state = await AsyncStorage.getItem('state');
    const cityArray = city.split(' ');
    const cityString = cityArray.reduce((acumulator, next) => {
      return acumulator + '/' + next;
    });
    const local = `${cityString}/${state}`;
    const page = this.state.page;
    const resp = await GitHubApi.getUsersByLocation(local, page);
    this.setState({page: page + 1, amount: resp.data.items.length});
    resp.data.items.map(u => {
      this.user(u.login);
    });
  };

  loadMoreData = x => {
    if (x == true) {
      this.setState({loaded: false, devs: []});
      this.addDev();
    }
  };

  listFooter = () => {
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.loadMoreData(true);
          }}>
          <Text style={styles.btnText}>Próxima página</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <LinearGradient
        colors={colors.linearGradientColors}
        style={styles.container}>
        <View style={styles.listContainer}>
          {this.state.page > 2 && (
            <TouchableOpacity
              onPress={() => {
                this.setState({page: this.state.page - 2}),
                  this.loadMoreData(true);
              }}
              style={styles.btnAnt}>
              <Text style={styles.btnText}>Página anterior</Text>
            </TouchableOpacity>
          )}

          {!this.state.loaded && (
            <View style={{top: '50%'}}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}

          {this.state.loaded && (
            <FlatList
              data={this.state.devs}
              keyExtractor={(item, index) => `${item.key}-${index}`}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('DevDetails', {
                        user: item,
                      })
                    }>
                    <DevFromList user={item} />
                  </TouchableOpacity>
                );
              }}
              onEndReached={this.loadMoreData}
              ListFooterComponent={this.listFooter.bind(this)}
            />
          )}
        </View>
        <Button
          title="Voltar para a HOME"
          onPress={() => {
            this.props.navigation.navigate('UserScreen');
          }}
        />
      </LinearGradient>
    );
  }
}

BuscaDevs.navigationOptions = {
  title: 'BuscaDevs',
};

const mapStateToProps = state => {
  return {
    token: state.access_token,
  };
};

export default connect(mapStateToProps)(BuscaDevs);
