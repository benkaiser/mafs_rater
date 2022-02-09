import html2canvas from 'html2canvas';
import React from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

interface IRaterProps {}

interface IRaterState {
  options?: string[];
  mode?: 'brides' | 'grooms';
  hardMode: boolean;
}

interface IFullItemDetails {
  id: string;
  name: string;
  index: number;
}



const optionGroups = {
  2021: {
    'grooms': [
      'brett-helling',
      'bryce-ruthven',
      'cameron-dunne',
      'jake-edwards',
      'james-susler',
      'jason-engler',
      'patrick-hayes-dwyer',
      'russell-duance',
      'sam-carraro',
    ],
    'brides': [
      'alana-lister',
      'belinda-vickers',
      'beth-moore',
      'booka-nile',
      'coco-stedman',
      'joanne-todd',
      'melissa-rawson',
      'rebecca-zemek',
      'samantha-harvey',
    ]
  },
  2022: {
    'grooms': [
      'al-perkins',
      'andrew-davis',
      'anthony-cincotta',
      'brent-vitiello',
      'cody-bromley',
      'jack-millar',
      'jackson-lonie',
      'mitch-eynaud'
    ],
    'brides': [
      'domenica-calarco',
      'ella-ding',
      'holly-greenstein',
      'olivia-frazer',
      'samantha-moitzi',
      'selin-makoni',
      'selina-chhaur',
      'tamara-djordjevic'
    ]
  }
};

class Rater extends React.Component<IRaterProps, IRaterState> {
  private SortableItem = SortableElement(({ item }: { item: IFullItemDetails }) => {
    const imgId = item.id === "your-partner" ? `your-partner-${ this.state.mode }` : item.id;
    const name = item.id === "your-partner" ? "My Partner" : item.name;
    return (
      <div className="item">
        <div className="inner-item">
          <img src={`images/individual/${imgId}.jpg`} />
          <p>{(item.index + 1)}. {name}</p>
        </div>
      </div>
    );
  });

  private SortableList = SortableContainer(({ items }: { items: string[] }) => (
    <div className="sortableContainer">
      {items.map((item: string, index: number) => {
        const fullDetail: IFullItemDetails = this._fullDetail(item, index);
        return <this.SortableItem
          key={`${fullDetail.id}`}
          index={index}
          item={fullDetail}
        />
      })}
    </div>
  ));

  constructor(props: IRaterProps) {
    super(props);
    this.state = {
      hardMode: false
    };
    window.onpopstate = () => {
      this.setState({
        hardMode: false,
        mode: undefined,
        options: undefined,
      })
    };
  }

  public render(): React.ReactNode {
    return (
      <div>
      <div id='shareTarget'>
        <h1 className="text-center heading">MAFS Rater<small>.com</small></h1>
        { this.state.options ? this._optionsView() : this._renderPicker() }
      </div>
        { this.state.options && this._optionsViewButtons() }
      </div>
    );
  }

  private _renderPicker(): React.ReactNode {
    return <div>
      <button className="button-primary" onClick={this._select.bind(this, 'grooms')}>Rate Grooms</button>
      <button className="button-primary" onClick={this._select.bind(this, 'brides')}>Rate Brides</button>
      <p className="text-center">
        Taking inspiration from the "experts" in Married at First Sight (Australia) Season {this._season()}, go ahead and rate the participants of the show. I'm sure it'll be really constructive for your relationship, and really help boost the self esteem of the show participants. While your at it don't forget to share a screenshot of your ratings on social media #MAFSrater.
      </p>
      <img className="nodImage" src="images/nod.gif" alt="John Aiken nodding" />
      { this._season() === 9
        ? <p className="text-center"><a href='./2021/'>Click here to see the season 8 version</a></p>
        : <p className="text-center"><a href='../'>Click here to see the season 9 version</a></p>}
    </div>
  }

  private _optionsView(): React.ReactNode {
    return (
      <div>
        <this.SortableList
          items={this.state.options!}
          onSortEnd={this.onSortEnd}
          axis="xy"
          helperClass="SortableHelper"
        />
      </div>
    );
  }

  private _optionsViewButtons(): React.ReactNode {
    return (
      <>
        <button className="button-secondary" onClick={this._toggleHardMode}>Toggle Hard Mode</button>
        <button className="button-secondary" onClick={this._select.bind(this, this.state.mode === 'brides' ? 'grooms' : 'brides' )}>Switch to {this.state.mode === 'brides' ? 'Grooms' : 'Brides'}</button>
        <button className="button-secondary" onClick={this._share}>Share (beta)</button>
      </>
    );
  }

  private _toggleHardMode = () => {
    const nextHardMode = !this.state.hardMode;
    this.setState({
      hardMode: nextHardMode,
      options: nextHardMode ? this.state.options!.concat('your-partner') : this.state.options!.filter(item => item !== 'your-partner')
    })
  }

  private _share = () => {
    html2canvas(document.getElementById('shareTarget')!, {
      scrollX: 0,
      scrollY: -window.scrollY
  }).then(async (canvas) => {
      const dataUrl = canvas.toDataURL();
      const blob = await (await fetch(dataUrl)).blob();
      const filesArray: File[] = [new File([blob], 'htmldiv.png', { type: blob.type, lastModified: new Date().getTime() })];
      const shareData = {
        files: filesArray,
      };
      navigator.share(shareData as any).then(() => {
        console.log('Shared successfully');
      })
    });
  }

  private onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    this.setState({
      options: arrayMove(this.state.options!, oldIndex, newIndex)
    });
  };

  private _select(group: 'grooms' | 'brides'): void {
    if (this.state.mode === undefined) {
      window.history.pushState(null, '', '?mode=rating');
    }
    this.setState({
      options: optionGroups[window.location.pathname.includes('2021') ? 2021 : 2022][group],
      hardMode: false,
      mode: group
    })
  }

  private _season(): number {
    return window.location.pathname.includes('2021') ? 8 : 9;
  }

  private _fullDetail(id: string, index: number): IFullItemDetails {
    return {
      id,
      name: id.split('-')[0],
      index
    }
  };
}

export default Rater;