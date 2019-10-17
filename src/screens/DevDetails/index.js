import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';

import RepositoryItems from '../../components/RepositoryItems';
import DevInfoItem from '../../components/DevInfoItem';
import SlidingTab from '../../components/SlidingTab';
import {ApiGitHub} from '../../services/ApiGitHub';

import styles from './styles';

const colorTheme = '#030442';

const repositoryData = [
  {
    id: '1',
    name: 'Django Project',
    stars: 120,
    language: 'python',
  },
  {
    id: '2',
    name: 'C++ Project',
    stars: 180,
    language: 'C++',
  },
  {
    id: '3',
    name: 'React Native Project',
    stars: 500,
    language: 'javascript',
  },
  {
    id: '4',
    name: 'Android Project',
    stars: 30,
    language: 'java',
  },
  {
    id: '5',
    name: 'Ruby Project',
    stars: 20,
    language: 'ruby',
  },
];

const dev = {
  name: 'Beltrano de Tal Almeida',
  username: 'Beltral',
  followers: 500,
  site: 'www.beltrano.com.br',
  email: 'beltrano-tal@gmail.com',
  image:
    'https://secure.gravatar.com/avatar/f50a9db56e231198af3507f10b5d5491?d=mm',
};

class DevDetails extends Component {
  state = {
    isFavorite: 'true',
  };

  scrollRef = null;
  scrollViewWidth = 280;

  async componentDidMount() {
    const api = new ApiGitHub();
    const user = await api.getUser();
    console.log(user.data);
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
    return (
      <View style={styles.container}>
        {/* ---------------------------------------------------------------- */}
        <View style={styles.cardA}></View>

        <View
          style={{
            position: 'absolute',
            top: '6%',
            left: '5%',
          }}>
          <TouchableOpacity onPress={() => console.log('fechar modal!')}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 5,
                padding: 2,
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                {' '}
                Voltar{' '}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.image}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 70}}
            source={{uri: dev.image}}
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
                  <DevInfoItem label="Username" value={dev.username} />
                  <DevInfoItem
                    label="Seguidores"
                    value={dev.followers.toString()}
                  />
                  <DevInfoItem label="Site" value={dev.site} />
                  <DevInfoItem label="E-mail" value={dev.email} />
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
      </View>
    );
  }
}

export default DevDetails;
