import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import * as io from 'socket.io-client';

describe('AppComponent', () => {
  let fixture, app, compiled, socket, tmp, obj, spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    socket = io('http://localhost:5000');
    socket.on('user', (msg)=>{
      tmp = msg;
    })
    socket.on("found", (data)=>{
      obj = data;
    })
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'auction-app'`, () => {
    expect(app.title).toEqual('auction-app');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('h1').textContent).toContain('auction-app');
  });

  it('should render the user', async() => {
    fixture.detectChanges();
    expect(tmp).toContain('User');
  })

  it('should have deadline', () => {
    fixture.detectChanges();
    expect(document.getElementById('deadline').textContent).toContain('Fri Mar 08 2019 18:00:00 GMT+0300 (GMT+03:00)');
  })


  it('should greater than 0', () => {
    fixture.detectChanges();
    expect(document.getElementById('highestBid').textContent).toBeGreaterThanOrEqual(0);
  })

  it('should send correct', () => {
    fixture.detectChanges();
    spy = spyOn(app, "sendMessage");
    let button = document.getElementById("send");
    button.click();
    expect(spy).toHaveBeenCalled();

  })

  it('should save correct', () => {
    fixture.detectChanges();
    app.sendMessage("User5", 600);
    expect(obj[0].bids.bid).toBe(600);
    expect(obj[0].bids.name).toBe("User5");
  })
});
