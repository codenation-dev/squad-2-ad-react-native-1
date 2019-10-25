import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Loading from '../../components/Loading';
import RepositoryItems from '../../components/RepositoryItems/index';
import DevInfoItem from '../../components/DevInfoItem/index';
import SlidingTab from '../../components/SlidingTab/index';
import GitHubApi from '../../services/GitHubApi';
import colors from '../../styles/colors';

import styles from './styles';

const colorTheme = '#030442';

class DevDetails extends Component {
  state = {
    isLoading: true,
    isFavorite: 'true',
    dev: null,
    repositoryData: null,
  };

  scrollRef = null;
  scrollViewWidth = 280;
  async componentDidMount() {
    const user = this.props.navigation.getParam('user');
    // const username = this.props.navigation.getParam('username');
    // const responseUser = await GitHubApi.getUserByUsername(username);
    const responseRepos = await GitHubApi.getRepos(user.login);
    this.setState({
      dev: user,
      repositoryData: responseRepos.data,
      isLoading: false,
    });
  }

  onLikeHandler = () => {
    this.setState(prevState => {
      return {isFavorite: !prevState.isFavorite};
    });
  };

  scrollHandler = xValue => {
    this.scrollRef.scrollTo({x: xValue});
  };

  render() {
    const isLoading = this.state.isLoading;
    if (isLoading) {
      return <Loading />;
    }
    const dev = this.state.dev;
    const repositoryData = this.state.repositoryData;

    return (
      <LinearGradient
        colors={colors.linearGradientColors}
        style={styles.container}>
        <View style={styles.cardA}></View>

        <View
          style={{
            position: 'absolute',
            top: '6%',
            left: '5%',
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 5,
                padding: 2,
              }}>
              <Text style={{color: 'white', padding: 3}}>Voltar</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.image}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 70}}
            source={{uri: dev.avatar_url}}
          />
        </View>
        {/* ---------------------------------------------------------------- */}
        <View style={styles.cardB}>
          <View>
            <Text style={styles.devName}>{dev.name}</Text>
          </View>

          <TouchableOpacity onPress={() => this.onLikeHandler()}>
            <View
              style={{
                marginTop: 10,
                alignSelf: 'center',
                flexDirection: 'row',
                borderColor: this.state.isFavorite ? 'green' : '#ccc',
                borderWidth: 1,
                padding: 2,
                borderRadius: 5,
              }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: this.state.isFavorite ? 'green' : '#ccc',
                  borderRadius: 10,
                }}></View>

              <Text
                style={{
                  marginLeft: 5,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {this.state.isFavorite ? 'Gostei!' : 'Gostou?'}
              </Text>
            </View>
          </TouchableOpacity>

          <SlidingTab
            labelTab1="Detalhes"
            labelTab2="Repositórios"
            scrollViewWidth={this.scrollViewWidth}
            scroll={this.scrollHandler}
          />

          <View
            style={{
              borderRadius: 20,
              alignSelf: 'center',
              width: '90%',
              height: '70%',
            }}>
            <ScrollView
              ref={scrollView => {
                if (scrollView !== null && this.scrollView !== scrollView) {
                  this.scrollRef = scrollView;
                }
              }}
              scrollEnabled={false}
              horizontal={true}>
              <View
                style={{
                  backgroundColor: colorTheme,
                  height: '100%',
                  width: this.scrollViewWidth,
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    flex: 1,
                    margin: 5,
                    padding: 1,
                    borderRadius: 40,
                    backgroundColor: 'white',
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}>
                  <DevInfoItem label="Nome" value={dev.name} />
                  <DevInfoItem label="Username" value={dev.login} />
                  <DevInfoItem
                    label="Seguidores"
                    value={dev.followers.toString()}
                  />
                  <DevInfoItem label="Site" value={dev.html_url} />
                  <DevInfoItem
                    label="E-mail"
                    value={dev.email ? dev.email : '----'}
                  />
                </View>
              </View>
              <View
                style={{
                  backgroundColor: colorTheme,
                  height: '100%',
                  width: this.scrollViewWidth,
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    borderRadius: 40,
                    backgroundColor: 'white',
                    margin: 5,
                    padding: 10,
                    width: '96%',
                    height: '96%',
                  }}>
                  <RepositoryItems data={repositoryData} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        {/* ---------------------------------------------------------------- */}
      </LinearGradient>
    );
  }
}

export default DevDetails;