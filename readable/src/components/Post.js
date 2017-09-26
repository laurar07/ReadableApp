import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';

class Post extends Component {
    render() {
        const {
          post
        } = this.props;
        return (
            <li className="posts-grid">
                <div className="list-posts-content">
                    <Link to={`/${post.category}/${post.id}`}>
                        <h3>{post.title}</h3>
                    </Link>
                    <div className="list-post-date">
                      Submitted {moment(parseInt(post.timestamp,10)).calendar()}
                    </div>
                    <div className="list-post-votes">
                      {post.voteScore} votes
                    </div>
                  </div>
            </li>
        )
    }
}

{/*<Container>
                    <Grid columns='equal' padded={false}>
                      <Grid.Row>
                        <Grid.Column>
                          <Link to={`/${post.category}/${post.id}`}>
                            <h3>{post.title}</h3>
                          </Link>
                        </Grid.Column>
                      </Grid.Row> 
                      <Grid.Row>
                        <Grid.Column>
                          <small>{moment(parseInt(post.timestamp,10)).calendar()}</small>
                        </Grid.Column>                    
                        <Grid.Column>
                          <small>Comments ({comments[post.id] ? comments[post.id].length : 0})</small>
                        </Grid.Column> 
                        <Grid.Column>
                          <RenderLogoEntry name={post.category}/>
                        </Grid.Column> 
                        <Grid.Column width={10} textAlign='right'>
                          <Vote id={post.id}  type={"posts"} voteScore={post.voteScore} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                </Container>*/}

export default Post;